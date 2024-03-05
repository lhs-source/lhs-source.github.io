
<template>
  <div class="flex" style="display: flex;">
    <div class="sudoku-table">
      <div
        v-for="(num, index) of solveTable" 
        :key="index" 
        class="cell-frame"
        :class="{
          'selected': selectedCell === index,
          'left-border': index % 3 === 0,
          'top-border': Math.floor(index / 9) % 3 === 0,
          'right-border': index % 3 === 2,
          'bottom-border': Math.floor(index / 9) % 3 === 2,
          'error': num.error === true,
          'same-number': selectedCellValue != null && (selectedCellValue === (num.value ?? num.input))
        }"
        @click="onClickCell(index)"
        @keyup="onKeyupNumber(index, $event)">
        <span v-if="num.value !== null" class="initial-number">
          {{ num.value }}
        </span>
        <span v-else-if="num.input !== null" class="input-number">
          {{ num.input }}
        </span>
        <div v-else class="candidate-list">
          <div class="candidate" 
            v-for="i in 9" 
            :key="i"
            :class="{
              'same-number': num.candidateList.indexOf(i) >= 0 && i === (selectedCellValue ?? 0)
            }">
            {{ num.candidateList.indexOf(i) >= 0 ? i : '' }}
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="mode-list">
        <div 
          :class="{'selected': selectedMode === 'number'}"
          @click="onClickMode('number')">
          정답
        </div>
        <div 
          :class="{'selected': selectedMode === 'candidate'}"
          @click="onClickMode('candidate')">
          후보자
        </div>
      </div>
      <button @click="onClickNextStep">next step</button>
      <button @click="onClickCandidate">candidate</button>
      <button @click="onClickHint">regen hint</button>
      <div class="number-pad">
        <div 
          class="num" 
          v-for="i in 9" 
          :key="i"
          @click="onClickNumber(i)">
          {{ i }}
        </div>
      </div>
    </div>
  </div>
  <div class="hint-list">
    <div 
      v-for="(hint, index) of hintList"
      :key="index"
      class="hint-item">
      <div v-if="hint.solved === false">틀렸습니다!</div>
      <div v-else>
        <div 
          v-if="index === 0"
          class="sudoku-table hint">
          <div
            v-for="(cell, index) of hintSudoku.board" 
            :key="index" 
            class="cell-frame"
            :class="{
              'left-border': index % 3 === 0,
              'top-border': Math.floor(index / 9) % 3 === 0,
              'right-border': index % 3 === 2,
              'bottom-border': Math.floor(index / 9) % 3 === 2,
              // 모든 steps 의 updates 의 index 를 배열로 펼쳐서 index 와 비교
              'hint-target': hintTarget.includes(index),
            }">
            <span class="index">{{ index }}</span>
            <span v-if="cell.value">{{ cell.value }}</span>
            <div v-else class="candidate-list remove-candidate">
              <div class="candidate" 
                v-for="i in 9" 
                :key="i"
                :class="{
                }">
                <span v-if="hintFlat.find((update) => update.index === index)?.eliminatedCandidate.includes(i)"
                  style="color:chartreuse;">
                  {{ i }}
                </span>
                <span v-else >
                  {{ cell.candidates.indexOf(i) >= 0 ? i : '' }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>hintTarget: {{ hintTarget }}</div>
        <div>hintFlat: {{ hintFlat }}</div>
        <div class="step-list">
          <div 
            v-for="(step, index) of hint.steps"
            :key="index"
            class="step">
            <div>다음 전략 : {{ step.strategy }}</div>
            <div v-for="(update, index) of step.updates" :key="index">
              <div>{{ update.index }}칸 : 
                / {{ update.filledValue }}입력 
                / {{ update.eliminatedCandidate }}제거</div>
            </div>
          </div>
        </div>
        <div class="strategy-list">
          <div
            v-for="(strategy, index) of hint.analysis?.usedStrategies"
            :key="index"
            class="strategy">
            <div>남은 전략 : {{ strategy?.title }} {{ strategy?.freq }}회</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { CellValue, SolvingResult } from './sudoku2types';
import { Sudoku } from './sudokuClass';

interface Solve {
  value: number | null;   // 초기값
  input: number | null;   // 입력한 값
  error: boolean; // 오답 표시
  candidateList: CellValue[]; // 후보자 리스트
}
const hintList = ref<SolvingResult[]>([]);
const selectedCell = ref<number | null>(null);  // 선택한 셀 인덱스
const solveTable = ref<Solve[]>([]);
const selectedMode = ref<'number' | 'candidate'>('number');

// console.log off
const originalConsoleLog = console.log;
// console.log = () => {};
const sudoku = ref<Sudoku>(new Sudoku('easy'));
const resultSudoku = ref<Sudoku>(new Sudoku('easy', sudoku.value.board.map((cell) => cell.value)));
const hintSudoku = ref<Sudoku>(new Sudoku('easy', sudoku.value.board.map((cell) => cell.value)));
console.log = originalConsoleLog;
console.log('sudoku', sudoku);
console.log('resultSudoku', resultSudoku);
console.log('hintSudoku', hintSudoku);

const displayTable = computed(() => {
  return solveTable.value.map((cell) => {
    return cell.input ?? cell.value;
  });
});
const selectedCellValue = computed(() => {
  if(selectedCell.value === null) return null;
  const cell = solveTable.value[selectedCell.value!];
  return cell.input ?? cell.value;
});
/**
 * ## 힌트 대상 셀
 * @returns number[]
 */
const hintTarget = computed(() => {
  if(hintList.value.length === 0) return [];
  const extractUpdateIndex = (step: {strategy: string, updates: any[]}) => {
    return step.updates.map((update: any) => update.index);
  }
  const extractList = hintList.value[0].steps?.reduce((acc: number[], step: {strategy: string, updates: any[]}) => {
    return acc.concat(extractUpdateIndex(step));
  }, []) ?? []
  const setList = new Set(extractList);
  return Array.from(setList);
})
/**
 * ## 힌트 대상 셀의 후보자 삭제 리스트
 */
const hintFlat = computed(() => {
  if(hintList.value.length === 0) return [];
  return hintList.value[0].steps?.reduce((acc: any[], step: {strategy: string, updates: any[]}) => {
    step.updates.map((update: any) => {
      const found = acc.find((item) => item.index === update.index);
      if(found) {
        // 이미 있는 경우
        // eliminatedCandidate 가 있으면 배열로 추가
        // filledValue 가 있으면 추가
        if(update.eliminatedCandidate && found.eliminatedCandidate.includes(update.eliminatedCandidate) === false) {
          found.eliminatedCandidate.push(update.eliminatedCandidate);
        } else {
          found.filledValue = update.filledValue;
        }
      } else {
        // 없는 경우
        // eliminatedCandidate 가 있으면 배열로 추가
        // filledValue 가 있으면 그냥
        acc.push({
          index: update.index, 
          eliminatedCandidate: [update.eliminatedCandidate],
          filledValue: update.filledValue,
        });
      }
    })
    return acc;
  }, [] as {index: number, eliminatedCandidate?: number[], filledValue: number}[]) ?? [];
})

const candidateList = computed(() => {
  return solveTable.value.map((cell) => cell.candidateList);
});

/**
 * # 힌트를 클릭
 */
function onClickHint() {
  const hint = hintSudoku.value.nextHint();
  console.log('hint', hint);
  hintList.value.unshift(hint);
}
/**
 * # 셀을 클릭한다.
 * - 클릭하고 숫자를 입력할 때 선행
 */
function onClickCell(cellIndex: number) {
  selectedCell.value = cellIndex;
}

function removeCandidate(index: number, filledValue: number) {
  const row = Math.floor(index / 9);
  const col = index % 9;
  const block = Math.floor(row / 3) * 3 + Math.floor(col / 3);
  
  for(let i = 0; i < 9; i++) {
    const rowCell = solveTable.value[row * 9 + i];
    const colCell = solveTable.value[col + i * 9];
    const blockCell = solveTable.value[Math.floor(block / 3) * 27 + (block % 3) * 3 + Math.floor(i / 3) * 9 + i % 3];
    if(rowCell.value === null) {
      rowCell.candidateList = rowCell.candidateList.filter((num) => num !== filledValue);
    }
    if(colCell.value === null) {
      colCell.candidateList = colCell.candidateList.filter((num) => num !== filledValue);
    }
    if(blockCell.value === null) {
      blockCell.candidateList = blockCell.candidateList.filter((num) => num !== filledValue);
    }
  }
}
/**
 * # 숫자를 선택한다.
 */
function onClickNumber(numberPad: number) {
  // 초기 셀은 변경할 수 없음
  // TODO 클릭 시 같은 숫자의 셀에 표시
  if(sudoku.value.board[selectedCell.value!].value !== null) return;
  if(selectedMode.value === 'candidate') {
    // 후보자 모드일 경우 후보자 리스트를 추가하거나 제거
    const cell = solveTable.value[selectedCell.value!];
    if(cell.candidateList.indexOf(numberPad) >= 0) {
      cell.candidateList = cell.candidateList.filter((num) => num !== numberPad);
    } else {
      cell.candidateList.push(numberPad);
    }
  } else {
    // 빈칸에 정답 입력
    const cell = solveTable.value[selectedCell.value!];
    cell.input = numberPad;
    nextTick(() => {
      // 입력한 값이 정답이 아닐 경우 에러로 표시
      if(cell.input !== resultSudoku.value.board![selectedCell.value!].value) {
        cell.error = true;
      } else {
        // 정답
        cell.error = false;
        // 가로줄, 세로줄, 3x3 블록에 후보자를 제거
        removeCandidate(selectedCell.value!, numberPad);
        sudoku.value.setNumber(selectedCell.value!, numberPad);
        hintSudoku.value.setNumber(selectedCell.value!, numberPad);
        
      }
      // 힌트를 계산
      console.log('displayTable.value', displayTable.value);
      const hint = hintSudoku.value.nextHint();
      hintList.value.unshift(hint);
    });
  }
}
/**
 * # 키보드로 숫자를 입력한다.
 * - 숫자를 가져와서 onClickNumber 함수를 호출
 */
function onKeyupNumber(cellIndex: number, event: Event) {
  const key = (event as KeyboardEvent).key;
  if(key === 'Backspace') {
    solveTable.value[cellIndex].input = null;
  } else {
    const num = parseInt(key);
    if(num >= 1 && num <= 9) {
      onClickNumber(num);
    }
  }
}
/**
 * # 모드를 선택한다.
 * - 숫자 모드, 후보자 모드
 */
function onClickMode(mode: 'number' | 'candidate') {
  selectedMode.value = mode;
}

function onClickNextStep() {
  const hint = hintList.value[0];
  hint.steps?.forEach((step) => {
    step.updates.forEach((update) => {
      if(update.filledValue) {
        solveTable.value[update.index].input = update.filledValue;
        onClickCell(update.index);
        onClickNumber(update.filledValue);
      }
      if(update.eliminatedCandidate) {
        solveTable.value[update.index].candidateList = solveTable.value[update.index].candidateList.filter((num) => num !== update.eliminatedCandidate);
      }
    });

  });
}

function onClickCandidate() {
  console.log('candidateAll', sudoku.value.board);
}

solveTable.value = sudoku.value.board.map((num) => {
  return { value: num.value, input: null, error: false, candidateList: num.candidates };
});

// resultSudoku.value.solve();
onClickHint();

onMounted(() => {
  // keyup 이벤트를 사용하기 위해 window에 이벤트를 등록
  window.addEventListener('keyup', (event) => {
    if(selectedCell.value !== null) {
      onKeyupNumber(selectedCell.value, event);
    }
  });
});
onUnmounted(() => {
  window.removeEventListener('keyup', (event) => {
    if(selectedCell.value !== null) {
      onKeyupNumber(selectedCell.value, event);
    }
  });
});

</script>

<style lang="scss">
$border-color : rgb(60, 121, 75);
$cell-size: 36px;

.sudoku-table {
  display: grid;
  /* grid-auto-flow: column; */
  grid-template-columns: repeat(9, 1fr);
  width: calc($cell-size * 9 * 1.5);
  height: calc($cell-size * 9 * 1.5);

  .cell-frame {
    position: relative;
    border: 1px solid $border-color;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: $cell-size;
    min-height: $cell-size;

    &:has(.initial-number) {
      font-weight: bold;
      color: rgb(39, 146, 92);
      font-size: 1.2em;
      background-color: rgb(211, 245, 227);
    }
    &:has(.input-number) {
      font-weight: bold;
      color: rgb(39, 121, 146);
      background-color: rgb(206, 230, 238);
    }
    // 후보자 리스트
    .candidate-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      align-items: center;
      justify-items: center;
      width: 100%;
      height: 100%;
      
      .candidate {
        width: calc($cell-size / 3);
        height: calc($cell-size / 3);
        font-size: 10px;
        color: rgb(39, 121, 146);
        text-align: center;

        &.same-number {
          background-color: rgb(39, 121, 146);
          color: white;
        }
        &.remove-target {
          background-color: rgb(184, 170, 170);
          color: rgb(212, 26, 26);
        }
      }
    }
    // 같은 숫자를 표시
    &.same-number {
      background-color: rgb(39, 121, 146);
      .initial-number, .input-number {
        color: white;
      }
    }
    &.selected {
      background-color: $border-color;
      .initial-number, .input-number {
        color: white;
      }
      .candidate {
        color: white;
      }
    }
    &.error {
      background-color: rgb(184, 170, 170);
      font-weight: bold;
      .initial-number, .input-number {
        color: rgb(212, 26, 26);
      }
    }
    &.left-border {
      border-left: 2px solid $border-color;
    }
    &.top-border {
      border-top: 2px solid $border-color;
    }
    &.right-border {
      border-right: 2px solid $border-color;
    }
    &.bottom-border {
      border-bottom: 2px solid $border-color;
    }
  }
  &.hint {
    width: calc($cell-size * 10);
    height: calc($cell-size * 10);
    .cell-frame {
      &.hint-target {
        background-color: rgb(39, 121, 146);
        color: white;
        .candidate {
          color: white;
        }
      }
    }

  }
}
.mode-list {
  margin-top: 36px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgb(209, 209, 209);
  div {
    padding: 16px;
    border: 1px solid rgb(128, 122, 122);
    &.selected {
      background-color: rgb(53, 42, 42);
      color: white;
    }
  }
}
.number-pad {
  margin-top: 36px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  .num {
    border: 1px solid rgb(74, 74, 74);
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 48px;
    min-height: 48px;

    &:hover {
      cursor: pointer;
      background-color: rgb(74, 74, 74);
      color: white;
    }
  }
}
.hint-list {
  margin-top: 36px;
  .hint-item {
    margin-top: 12px;
    padding: 12px;
    border: 1px solid rgb(74, 74, 74);
    .cell-frame{
      .index {
        visibility: hidden;
        position:absolute; 
        top:0; 
        left:0; 
        display: block;
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%; 
        background-color: blue;
        color: white;
        font-size: 0.6em;
        text-align: center;
      }
      &:hover {
        .index {
          visibility: visible;
        }
      }
    }
    
    // 다음 전략 추천
    .step-list{
      .step {
        margin-top: 12px;
        padding: 12px;
        background-color: rgb(209, 209, 209);
      }
    }
    // 전략 분석 목록
    .strategy-list {
        border: 1px solid rgb(173, 173, 173);
      .strategy {
        padding: 12px;
      }
    }
  }
}
</style>
  