<template>
  <div class="sudoku-container">
    <Header>
      <div class="page-title">스도쿠</div>
    </Header>
    
    <div class="sudoku-game-wrapper">
      <div class="sudoku-board-section">
        <!-- 스도쿠 보드 -->
        <div class="sudoku-board">
          <div
            v-for="(cell, index) in gameBoard"
            :key="index"
            :class="[
              'sudoku-cell',
              {
                'selected': selectedCellIndex === index,
                'initial': cell.isInitial,
                'error': cell.isError,
                'same-number': highlightedNumber && (cell.value === highlightedNumber || (cell.notes && cell.notes.includes(highlightedNumber))),
                'hint-highlight': currentHint && currentHint.highlightCells && currentHint.highlightCells.includes(index),
                'left-thick': index % 3 === 0,
                'top-thick': Math.floor(index / 9) % 3 === 0,
                'right-thick': index % 3 === 2,
                'bottom-thick': Math.floor(index / 9) % 3 === 2,
              }
            ]"
            @click="selectCell(index)"
          >
            <!-- 숫자가 입력된 경우 -->
            <span v-if="cell.value" class="cell-number">
              {{ cell.value }}
            </span>
            <!-- 연필(메모) 모드일 때 -->
            <div v-else-if="cell.notes && cell.notes.length > 0" class="cell-notes">
              <div
                v-for="num in 9"
                :key="num"
                :class="['note-item', { 'has-note': cell.notes.includes(num) }]"
              >
                {{ cell.notes.includes(num) ? num : '' }}
              </div>
            </div>
          </div>
        </div>

        <!-- 게임 상태 표시 -->
        <div class="game-status">
          <div v-if="isGameComplete" class="completion-message">
            🎉 축하합니다! 스도쿠를 완성했습니다!
          </div>
          <div class="game-info">
            <span>시간: {{ formatTime(gameTime) }}</span>
            <span>난이도: {{ difficulty }}</span>
          </div>
        </div>
      </div>

      <div class="controls-section">
        <!-- 모드 선택 -->
        <div class="mode-selector">
          <button
            :class="['mode-btn', { active: inputMode === 'number' }]"
            @click="setInputMode('number')"
          >
            숫자 입력
          </button>
          <button
            :class="['mode-btn', { active: inputMode === 'notes' }]"
            @click="setInputMode('notes')"
          >
            연필 메모
          </button>
        </div>

        <!-- 숫자 패드 -->
        <div class="number-pad">
          <button
            v-for="num in 9"
            :key="num"
            :class="['number-btn', { highlighted: highlightedNumber === num }]"
            @click="inputNumber(num)"
            @mouseover="highlightedNumber = num"
            @mouseleave="highlightedNumber = null"
          >
            {{ num }}
          </button>
          <button class="number-btn erase-btn" @click="eraseCell">
            지우기
          </button>
        </div>

        <!-- 난이도 선택 -->
        <div class="difficulty-selector">
          <label for="difficulty">난이도:</label>
          <select id="difficulty" v-model="difficulty" class="difficulty-select">
            <option value="easy">쉬움</option>
            <option value="medium">보통</option>
            <option value="hard">어려움</option>
            <option value="expert">전문가</option>
            <option value="master">마스터</option>
          </select>
        </div>

        <!-- 게임 컨트롤 -->
        <div class="game-controls">
          <button class="control-btn new-game" @click="newGame">
            새 게임
          </button>
          <button class="control-btn" @click="undo" :disabled="!canUndo">
            취소
          </button>
          <button class="control-btn" @click="redo" :disabled="!canRedo">
            되돌리기
          </button>
        </div>

        <!-- 고급 기능 -->
        <div class="advanced-controls">
          <button class="control-btn" @click="autoFillNotes">
            전체 연필
          </button>
          <button class="control-btn" @click="getHint">
            힌트
          </button>
        </div>

        <!-- 힌트 표시 -->
        <div v-if="currentHint" class="hint-display">
          <h4>힌트</h4>
          <p>{{ currentHint.message }}</p>
          <div v-if="currentHint.highlightCells" class="hint-actions">
            <button @click="applyHint">적용</button>
            <button @click="clearHint">닫기</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useHead, useSeoMeta } from '#app'
import Header from '~/components/Header.vue'
import { generate, solve, hint, candidateAll } from '~/lib/sudoku/index'
import type { Board, Difficulty, SolvingResult } from '~/lib/sudoku/types'

// SEO 설정
useHead({
  title: '스도쿠 게임 - LHS'
})

useSeoMeta({
  title: '스도쿠 게임',
  description: '9x9 스도쿠 퍼즐 게임을 즐겨보세요. 힌트, 연필 메모, 취소 기능 등 다양한 기능을 제공합니다.',
})

// 게임 상태
interface SudokuCell {
  value: number | null
  isInitial: boolean
  isError: boolean
  notes: number[]
}

interface GameMove {
  cellIndex: number
  previousValue: number | null
  newValue: number | null
  previousNotes: number[]
  newNotes: number[]
  moveType: 'number' | 'notes' | 'erase'
}

const gameBoard = ref<SudokuCell[]>([])
const solution = ref<number[]>([])
const selectedCellIndex = ref<number | null>(null)
const inputMode = ref<'number' | 'notes'>('number')
const highlightedNumber = ref<number | null>(null)
const gameTime = ref(0)
const difficulty = ref<Difficulty>('medium')
const isGameComplete = ref(false)
const currentHint = ref<{
  message: string
  highlightCells?: number[]
  suggestedNumber?: number
  cellIndex?: number
  eliminatedNotes?: { cellIndex: number, numbers: number[] }[]
} | null>(null)

// 히스토리 관리
const moveHistory = ref<GameMove[]>([])
const historyPosition = ref(-1)

const canUndo = computed(() => historyPosition.value >= 0)
const canRedo = computed(() => historyPosition.value < moveHistory.value.length - 1)

// 게임 타이머
let gameTimer: NodeJS.Timeout | null = null

// 게임 초기화
const initializeGame = (puzzle: number[], solutionData: number[]) => {
  gameBoard.value = puzzle.map((value, index) => ({
    value,
    isInitial: value !== null,
    isError: false,
    notes: []
  }))
  solution.value = solutionData
  selectedCellIndex.value = null
  moveHistory.value = []
  historyPosition.value = -1
  isGameComplete.value = false
  gameTime.value = 0
  
  // 타이머 시작
  if (gameTimer) clearInterval(gameTimer)
  gameTimer = setInterval(() => {
    if (!isGameComplete.value) {
      gameTime.value++
    }
  }, 1000)
}

// 셀 선택
const selectCell = (index: number) => {
  selectedCellIndex.value = index
  const cell = gameBoard.value[index]
  if (cell.value) {
    highlightedNumber.value = cell.value
  }
}

// 입력 모드 변경
const setInputMode = (mode: 'number' | 'notes') => {
  inputMode.value = mode
}

// 숫자 입력
const inputNumber = (num: number) => {
  if (selectedCellIndex.value === null) return
  
  const cellIndex = selectedCellIndex.value
  const cell = gameBoard.value[cellIndex]
  
  if (cell.isInitial) return // 초기값은 변경 불가
  
  if (inputMode.value === 'number') {
    // 숫자 입력 모드
    const previousValue = cell.value
    const previousNotes = [...cell.notes]
    
    cell.value = num
    cell.notes = []
    cell.isError = solution.value[cellIndex] !== num
    
    // 히스토리 저장
    addToHistory({
      cellIndex,
      previousValue,
      newValue: num,
      previousNotes,
      newNotes: [],
      moveType: 'number'
    })
    
    checkGameCompletion()
  } else {
    // 연필 메모 모드
    const previousNotes = [...cell.notes]
    
    if (cell.notes.includes(num)) {
      cell.notes = cell.notes.filter(n => n !== num)
    } else {
      cell.notes = [...cell.notes, num].sort()
    }
    
    // 히스토리 저장
    addToHistory({
      cellIndex,
      previousValue: cell.value,
      newValue: cell.value,
      previousNotes,
      newNotes: [...cell.notes],
      moveType: 'notes'
    })
  }
}

// 셀 지우기
const eraseCell = () => {
  if (selectedCellIndex.value === null) return
  
  const cellIndex = selectedCellIndex.value
  const cell = gameBoard.value[cellIndex]
  
  if (cell.isInitial) return
  
  const previousValue = cell.value
  const previousNotes = [...cell.notes]
  
  cell.value = null
  cell.notes = []
  cell.isError = false
  
  // 히스토리 저장
  addToHistory({
    cellIndex,
    previousValue,
    newValue: null,
    previousNotes,
    newNotes: [],
    moveType: 'erase'
  })
}

// 히스토리 관리
const addToHistory = (move: GameMove) => {
  // 현재 위치 이후의 히스토리 제거
  moveHistory.value = moveHistory.value.slice(0, historyPosition.value + 1)
  moveHistory.value.push(move)
  historyPosition.value = moveHistory.value.length - 1
}

// 취소
const undo = () => {
  if (!canUndo.value) return
  
  const move = moveHistory.value[historyPosition.value]
  const cell = gameBoard.value[move.cellIndex]
  
  cell.value = move.previousValue
  cell.notes = [...move.previousNotes]
  cell.isError = move.previousValue ? solution.value[move.cellIndex] !== move.previousValue : false
  
  historyPosition.value--
}

// 되돌리기
const redo = () => {
  if (!canRedo.value) return
  
  historyPosition.value++
  const move = moveHistory.value[historyPosition.value]
  const cell = gameBoard.value[move.cellIndex]
  
  cell.value = move.newValue
  cell.notes = [...move.newNotes]
  cell.isError = move.newValue ? solution.value[move.cellIndex] !== move.newValue : false
  
  checkGameCompletion()
}

// 전체 연필 메모 자동 채우기
const autoFillNotes = () => {
  try {
    // 현재 보드 상태를 라이브러리 형식으로 변환
    const currentBoard: Board = gameBoard.value.map(cell => cell.value)
    
    // 고급 후보 생성기 사용
    const candidateBoard = candidateAll(currentBoard)
    
    candidateBoard.forEach((cell, index) => {
      const gameCell = gameBoard.value[index]
      if (gameCell.value || gameCell.isInitial) return
      
      // 라이브러리에서 제공하는 후보들을 필터링 (null 제거)
      const libraryNotes = cell.candidates.filter(candidate => candidate !== null) as number[]
      const previousNotes = [...gameCell.notes]
      
      gameCell.notes = libraryNotes
      
      // 히스토리에 추가
      if (JSON.stringify(previousNotes) !== JSON.stringify(libraryNotes)) {
        addToHistory({
          cellIndex: index,
          previousValue: gameCell.value,
          newValue: gameCell.value,
          previousNotes,
          newNotes: [...libraryNotes],
          moveType: 'notes'
        })
      }
    })
  } catch (error) {
    console.error('Advanced auto-fill failed:', error)
    // 실패 시 기본 방식 사용
    gameBoard.value.forEach((cell, index) => {
      if (cell.value || cell.isInitial) return
      
      const possibleNumbers = getPossibleNumbers(index)
      const previousNotes = [...cell.notes]
      
      cell.notes = possibleNumbers
      
      // 히스토리에 추가
      if (JSON.stringify(previousNotes) !== JSON.stringify(possibleNumbers)) {
        addToHistory({
          cellIndex: index,
          previousValue: cell.value,
          newValue: cell.value,
          previousNotes,
          newNotes: [...possibleNumbers],
          moveType: 'notes'
        })
      }
    })
  }
}

// 특정 셀에서 가능한 숫자들 구하기
const getPossibleNumbers = (cellIndex: number): number[] => {
  const row = Math.floor(cellIndex / 9)
  const col = cellIndex % 9
  const boxRow = Math.floor(row / 3) * 3
  const boxCol = Math.floor(col / 3) * 3
  
  const usedNumbers = new Set<number>()
  
  // 같은 행의 숫자들
  for (let c = 0; c < 9; c++) {
    const value = gameBoard.value[row * 9 + c].value
    if (value) usedNumbers.add(value)
  }
  
  // 같은 열의 숫자들
  for (let r = 0; r < 9; r++) {
    const value = gameBoard.value[r * 9 + col].value
    if (value) usedNumbers.add(value)
  }
  
  // 같은 3x3 박스의 숫자들
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      const value = gameBoard.value[r * 9 + c].value
      if (value) usedNumbers.add(value)
    }
  }
  
  const possible: number[] = []
  for (let num = 1; num <= 9; num++) {
    if (!usedNumbers.has(num)) {
      possible.push(num)
    }
  }
  
  return possible
}

// 힌트 기능
const getHint = () => {
  try {
    // 현재 보드 상태를 라이브러리 형식으로 변환
    const currentBoard: Board = gameBoard.value.map(cell => cell.value)
    
    // 고급 힌트 시스템 사용
    const hintResult = hint(currentBoard)
    
    if (hintResult.solved && hintResult.steps && hintResult.steps.length > 0) {
      const step = hintResult.steps[0]
      const update = step.updates[0]
      
      if (update.filledValue) {
        // 숫자를 채우는 힌트
        const row = Math.floor(update.index / 9) + 1
        const col = (update.index % 9) + 1
        currentHint.value = {
          message: `${step.strategy}를 사용하여 ${row}행 ${col}열에 ${update.filledValue}을(를) 입력할 수 있습니다.`,
          highlightCells: [update.index],
          suggestedNumber: update.filledValue,
          cellIndex: update.index
        }
        return
      } else if (update.eliminatedCandidate) {
        // 후보 제거 힌트
        const row = Math.floor(update.index / 9) + 1
        const col = (update.index % 9) + 1
        currentHint.value = {
          message: `${step.strategy}를 사용하여 ${row}행 ${col}열에서 후보 ${update.eliminatedCandidate}을(를) 제거할 수 있습니다.`,
          highlightCells: [update.index],
          eliminatedNotes: [{ cellIndex: update.index, numbers: [update.eliminatedCandidate] }]
        }
        return
      }
    }
    
    // 고급 힌트가 없으면 기본 힌트 사용
    getBasicHint()
  } catch (error) {
    console.error('Advanced hint failed:', error)
    getBasicHint()
  }
}

// 기본 힌트 기능
const getBasicHint = () => {
  // 1. 한 개의 후보만 남은 셀 찾기
  for (let i = 0; i < gameBoard.value.length; i++) {
    const cell = gameBoard.value[i]
    if (!cell.value && !cell.isInitial) {
      const possible = getPossibleNumbers(i)
      if (possible.length === 1) {
        currentHint.value = {
          message: `${Math.floor(i / 9) + 1}행 ${(i % 9) + 1}열에는 ${possible[0]}만 들어갈 수 있습니다.`,
          highlightCells: [i],
          suggestedNumber: possible[0],
          cellIndex: i
        }
        return
      }
    }
  }
  
  // 2. 특정 숫자가 한 줄에서 한 자리에만 들어갈 수 있는 경우 찾기
  for (let num = 1; num <= 9; num++) {
    // 각 행 검사
    for (let row = 0; row < 9; row++) {
      const possibleCells: number[] = []
      for (let col = 0; col < 9; col++) {
        const cellIndex = row * 9 + col
        const cell = gameBoard.value[cellIndex]
        if (!cell.value && getPossibleNumbers(cellIndex).includes(num)) {
          possibleCells.push(cellIndex)
        }
      }
      if (possibleCells.length === 1) {
        currentHint.value = {
          message: `${row + 1}행에서 숫자 ${num}은 ${(possibleCells[0] % 9) + 1}열에만 들어갈 수 있습니다.`,
          highlightCells: possibleCells,
          suggestedNumber: num,
          cellIndex: possibleCells[0]
        }
        return
      }
    }
  }
  
  currentHint.value = {
    message: '더 이상 간단한 힌트를 찾을 수 없습니다. 논리적 추론이 필요합니다.',
    highlightCells: undefined
  }
}

// 힌트 적용
const applyHint = () => {
  if (!currentHint.value) return
  
  if (currentHint.value.cellIndex !== undefined && currentHint.value.suggestedNumber) {
    // 숫자 입력 힌트 적용
    selectedCellIndex.value = currentHint.value.cellIndex
    inputNumber(currentHint.value.suggestedNumber)
  } else if (currentHint.value.eliminatedNotes) {
    // 후보 제거 힌트 적용
    currentHint.value.eliminatedNotes.forEach(({ cellIndex, numbers }) => {
      const cell = gameBoard.value[cellIndex]
      const previousNotes = [...cell.notes]
      
      // 지정된 숫자들을 후보에서 제거
      cell.notes = cell.notes.filter(note => !numbers.includes(note))
      
      // 히스토리에 추가
      if (JSON.stringify(previousNotes) !== JSON.stringify(cell.notes)) {
        addToHistory({
          cellIndex,
          previousValue: cell.value,
          newValue: cell.value,
          previousNotes,
          newNotes: [...cell.notes],
          moveType: 'notes'
        })
      }
    })
  }
  
  clearHint()
}

// 힌트 지우기
const clearHint = () => {
  currentHint.value = null
}

// 게임 완료 체크
const checkGameCompletion = () => {
  const isComplete = gameBoard.value.every(cell => 
    cell.value !== null && !cell.isError
  )
  
  if (isComplete) {
    isGameComplete.value = true
    if (gameTimer) {
      clearInterval(gameTimer)
      gameTimer = null
    }
  }
}

// 시간 포맷팅
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// 새 게임
const newGame = () => {
  try {
    // 고급 스도쿠 생성기 사용
    const puzzle = generate(difficulty.value)
    const solutionResult = solve(puzzle)
    
    if (solutionResult.solved && solutionResult.board) {
      initializeGame(puzzle, solutionResult.board)
    } else {
      // 실패 시 기본 퍼즐 사용
      const fallbackPuzzle = generateSimplePuzzle()
      const fallbackSolution = solvePuzzle([...fallbackPuzzle])
      if (fallbackSolution) {
        initializeGame(fallbackPuzzle, fallbackSolution)
      }
    }
  } catch (error) {
    console.error('Failed to generate new game:', error)
    // 실패 시 기본 퍼즐 사용
    const fallbackPuzzle = generateSimplePuzzle()
    const fallbackSolution = solvePuzzle([...fallbackPuzzle])
    if (fallbackSolution) {
      initializeGame(fallbackPuzzle, fallbackSolution)
    }
  }
}

// 간단한 퍼즐 생성 (실제 구현에서는 더 정교한 알고리즘 사용)
const generateSimplePuzzle = (): (number | null)[] => {
  // 완성된 스도쿠에서 일부 숫자를 제거하여 퍼즐 생성
  const completedBoard = [
    5, 3, 4, 6, 7, 8, 9, 1, 2,
    6, 7, 2, 1, 9, 5, 3, 4, 8,
    1, 9, 8, 3, 4, 2, 5, 6, 7,
    8, 5, 9, 7, 6, 1, 4, 2, 3,
    4, 2, 6, 8, 5, 3, 7, 9, 1,
    7, 1, 3, 9, 2, 4, 8, 5, 6,
    9, 6, 1, 5, 3, 7, 2, 8, 4,
    2, 8, 7, 4, 1, 9, 6, 3, 5,
    3, 4, 5, 2, 8, 6, 1, 7, 9
  ]
  
  // 일부 칸을 비우기 (약 40개 정도)
  const puzzle = [...completedBoard]
  const cellsToRemove = 40
  const removedCells = new Set<number>()
  
  while (removedCells.size < cellsToRemove) {
    const randomIndex = Math.floor(Math.random() * 81)
    if (!removedCells.has(randomIndex)) {
      puzzle[randomIndex] = null
      removedCells.add(randomIndex)
    }
  }
  
  return puzzle
}

// 퍼즐 풀이 (백트래킹 알고리즘)
const solvePuzzle = (puzzle: (number | null)[]): number[] | null => {
  const board = [...puzzle]
  
  const isValid = (board: (number | null)[], pos: number, num: number): boolean => {
    const row = Math.floor(pos / 9)
    const col = pos % 9
    
    // 행 검사
    for (let i = 0; i < 9; i++) {
      if (board[row * 9 + i] === num) return false
    }
    
    // 열 검사
    for (let i = 0; i < 9; i++) {
      if (board[i * 9 + col] === num) return false
    }
    
    // 3x3 박스 검사
    const boxRow = Math.floor(row / 3) * 3
    const boxCol = Math.floor(col / 3) * 3
    for (let r = boxRow; r < boxRow + 3; r++) {
      for (let c = boxCol; c < boxCol + 3; c++) {
        if (board[r * 9 + c] === num) return false
      }
    }
    
    return true
  }
  
  const solve = (board: (number | null)[]): boolean => {
    for (let i = 0; i < 81; i++) {
      if (board[i] === null) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, i, num)) {
            board[i] = num
            if (solve(board)) return true
            board[i] = null
          }
        }
        return false
      }
    }
    return true
  }
  
  if (solve(board)) {
    return board as number[]
  }
  return null
}

// 키보드 입력 처리
const handleKeyPress = (event: KeyboardEvent) => {
  if (selectedCellIndex.value === null) return
  
  const key = event.key
  
  if (key >= '1' && key <= '9') {
    const num = parseInt(key)
    inputNumber(num)
  } else if (key === 'Backspace' || key === 'Delete') {
    eraseCell()
  } else if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
    event.preventDefault()
    moveSelection(key)
  }
}

// 선택 셀 이동
const moveSelection = (direction: string) => {
  if (selectedCellIndex.value === null) return
  
  const currentIndex = selectedCellIndex.value
  const row = Math.floor(currentIndex / 9)
  const col = currentIndex % 9
  
  let newRow = row
  let newCol = col
  
  switch (direction) {
    case 'ArrowUp':
      newRow = Math.max(0, row - 1)
      break
    case 'ArrowDown':
      newRow = Math.min(8, row + 1)
      break
    case 'ArrowLeft':
      newCol = Math.max(0, col - 1)
      break
    case 'ArrowRight':
      newCol = Math.min(8, col + 1)
      break
  }
  
  selectedCellIndex.value = newRow * 9 + newCol
}

// 컴포넌트 마운트
onMounted(() => {
  newGame()
  window.addEventListener('keydown', handleKeyPress)
})

// 컴포넌트 언마운트
onUnmounted(() => {
  if (gameTimer) {
    clearInterval(gameTimer)
  }
  window.removeEventListener('keydown', handleKeyPress)
})
</script>

<style scoped lang="scss">
.sudoku-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.page-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-align: center;
  padding: 1rem 0;
}

.sudoku-game-wrapper {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
}

.sudoku-board-section {
  flex: 1;
}

.sudoku-board {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 1px;
  background: #333;
  border: 3px solid #333;
  max-width: 500px;
  margin: 0 auto;
  aspect-ratio: 1;
  
  .sudoku-cell {
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    min-height: 50px;
    
    &.selected {
      background: #e3f2fd;
      box-shadow: inset 0 0 0 2px #2196f3;
    }
    
    &.initial {
      background: #f5f5f5;
      font-weight: bold;
      color: #333;
    }
    
    &.error {
      background: #ffebee;
      color: #d32f2f;
    }
    
    &.same-number {
      background: #fff3e0;
    }
    
    &.hint-highlight {
      background: #e8f5e8;
      box-shadow: inset 0 0 0 2px #4caf50;
      animation: hintPulse 1s ease-in-out 3;
    }
    
    &.left-thick {
      border-left: 3px solid #333;
    }
    
    &.top-thick {
      border-top: 3px solid #333;
    }
    
    &.right-thick {
      border-right: 3px solid #333;
    }
    
    &.bottom-thick {
      border-bottom: 3px solid #333;
    }
    
    .cell-number {
      font-size: 1.5rem;
      font-weight: 500;
    }
    
    // 사용자가 입력한 숫자는 파란색으로 표시
    &:not(.initial) .cell-number {
      color: #1565c0;
      font-weight: 600;
    }
    
    .cell-notes {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      width: 100%;
      height: 100%;
      padding: 2px;
      
      .note-item {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.6rem;
        color: #666;
        
        &.has-note {
          color: #2196f3;
          font-weight: 500;
        }
      }
    }
  }
}

.game-status {
  margin-top: 1rem;
  text-align: center;
  
  .completion-message {
    font-size: 1.2rem;
    color: #4caf50;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  
  .game-info {
    display: flex;
    justify-content: center;
    gap: 2rem;
    color: white;
    
    span {
      background: rgba(255, 255, 255, 0.1);
      padding: 0.5rem 1rem;
      border-radius: 8px;
    }
  }
}

.controls-section {
  width: 300px;
  
  @media (max-width: 768px) {
    width: 100%;
  }
}

.mode-selector {
  display: flex;
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
  
  .mode-btn {
    flex: 1;
    padding: 0.75rem;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    
    &.active {
      background: #2196f3;
    }
  }
}

.number-pad {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
  
  .number-btn {
    aspect-ratio: 1;
    border: none;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.9);
    color: #333;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
      background: white;
      transform: translateY(-1px);
    }
    
    &.highlighted {
      background: #2196f3;
      color: white;
    }
    
    &.erase-btn {
      grid-column: 1 / -1;
      background: #ff5722;
      color: white;
      
      &:hover {
        background: #d84315;
      }
    }
  }
}

.game-controls {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  
  .control-btn {
    padding: 0.75rem;
    border: none;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.9);
    color: #333;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover:not(:disabled) {
      background: white;
      transform: translateY(-1px);
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    &.new-game {
      background: #4caf50;
      color: white;
      
      &:hover {
        background: #388e3c;
      }
    }
  }
}

.difficulty-selector {
  margin-bottom: 1rem;
  
  label {
    display: block;
    color: white;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  
  .difficulty-select {
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.9);
    color: #333;
    font-weight: 500;
    cursor: pointer;
    
    &:hover {
      background: white;
    }
    
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px #2196f3;
    }
  }
}

.advanced-controls {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  
  .control-btn {
    padding: 0.75rem;
    border: none;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.9);
    color: #333;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
      background: white;
      transform: translateY(-1px);
    }
  }
}

.hint-display {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  padding: 1rem;
  
  h4 {
    margin: 0 0 0.5rem 0;
    color: #333;
  }
  
  p {
    margin: 0 0 1rem 0;
    color: #666;
    line-height: 1.4;
  }
  
  .hint-actions {
    display: flex;
    gap: 0.5rem;
    
    button {
      flex: 1;
      padding: 0.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      
      &:first-child {
        background: #2196f3;
        color: white;
      }
      
      &:last-child {
        background: #f5f5f5;
        color: #333;
      }
    }
  }
}

@keyframes hintPulse {
  0%, 100% { 
    transform: scale(1);
    opacity: 1;
  }
  50% { 
    transform: scale(1.05);
    opacity: 0.8;
  }
}
</style>
