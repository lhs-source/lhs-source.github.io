// Importing necessary constants
import { createSudokuInstance } from "./sudoku2";
import {
  DIFFICULTY_MEDIUM,
  BOARD_SIZE,
  CANDIDATES,
  NULL_CANDIDATE_LIST,
  DIFFICULTY_HARD,
  DIFFICULTY_EASY,
  DIFFICULTY_EXPERT,
  DIFFICULTY_MASTER,
} from "./sudoku2constants";

// Importing necessary types
import type {
  Board,
  CellValue,
  InternalBoard,
  StrategyFn,
  Strategy,
  Options,
  House,
  AnalyzeData,
  Difficulty,
  Update,
  Houses,
  SolvingResult,
  SolvingStep,
} from "./sudoku2types";

// Importing utility functions
import {
  addValueToCellIndex,
  calculateBoardDifficulty,
  contains,
  generateHouseIndexList,
  getRandomCandidateOfCell,
  getRemovalCountBasedOnDifficulty,
  isBoardFinished,
  isEasyEnough,
  isHardEnough,
} from "./sudoku2utils";



export class Sudoku {
  static GROUP_OF_HOUSES: Houses[] = [];
  static BOARD_SIZE: number = BOARD_SIZE;
  board: InternalBoard = [];
  usedStrategies: Array<number> = [];
  difficulty: Difficulty = DIFFICULTY_MEDIUM;
  initialBoard: Board = [];
  // solvedBoard: SolvingResult = { solved: false, error: "No solution for provided board!" };

  constructor(difficulty: Difficulty, initBoard?: Board) {
    this.difficulty = difficulty;
    Sudoku.GROUP_OF_HOUSES = generateHouseIndexList(BOARD_SIZE);
    if (!initBoard) {
      this.initializeBoard(initBoard);
      this.generateBoard();
      this.initialBoard = [...this.numberBoard];
      // this.solvedBoard = this.solve(this.initialBoard);
    } else {
      this.board = this.convertInitialBoardToSerializedBoard(initBoard);
      this.updateCandidatesBasedOnCellsValue();
      // this.analyzeBoard();
    }
  }
  get numberBoard() {
    return this.board.map((cell) => cell.value);
  }

  setNumber(index: number, value: number) {
    addValueToCellIndex(this.board, index, value);
  }
  nextHint(): SolvingResult {
    const solvingSteps: SolvingStep[] = [];
    // const analysis = this.analyzeBoard();
    // const analysis = this.analyzeBoard();
  
    // if (!analysis.hasSolution) {
    //   return { solved: false, error: "No solution for provided board!" };
    // }
    // const tempBoard = this.solveStepSimulate();
    // const board = tempBoard === false ? [] : tempBoard.map((cell) => cell.value);
    const stepUpdate = (solvingStep:any) => {
      solvingSteps.push(solvingStep)
      // console.log('solvingSteps', solvingSteps);
    }
    const board = this.solveStep({onUpdate: stepUpdate});
  
    if (!board) {
      return { solved: false, error: "No solution for provided board!" };
    }
  
    // if (!analysis.hasUniqueSolution) {
      return {
        solved: true,
        board,
        steps: solvingSteps,
        // analysis,
        error: "No unique solution for provided board!",
      };
    // }
  
    return { solved: true, board, steps: solvingSteps, analysis };
  }
  
  /**
   * # 보드를 초기화
   * - null 로 BOARD_SIZE * BOARD_SIZE 만큼 초기화
   * - candidates 는 숫자 채워진 곳을 제외하면 [null, ..., null] 배열로 초기화
   * @param initBoard 
   */
  initializeBoard(initBoard?: Board) {
    const alreadyEnhanced = this.board[0] !== null && typeof this.board[0] === "object";
    if (!alreadyEnhanced) {
      // Enhance board to handle candidates and possibly other params
      this.board = Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, index) => {
        const value = initBoard?.[index] ?? null;
        const candidates = value == null ? [...CANDIDATES] : [...NULL_CANDIDATE_LIST];
        return { value, candidates };
      });
    }
  };

  generateBoard() {
    this.generateBoardAnswerRecursively(0);
    const slicedBoard = JSON.parse(JSON.stringify(this.board));

    this.prepareGameBoard();
    // function isBoardTooEasy(sudoku: Sudoku) {
    //   sudoku.prepareGameBoard();
    //   const data = sudoku.analyzeBoard();
    //   if (data.hasSolution && data.difficulty) {
    //     return !isHardEnough(sudoku.difficulty, data.difficulty);
    //   }
    //   return true;
    // }
    // while (isBoardTooEasy(this)) {
    //   this.board = slicedBoard.slice();
    // }

    this.updateCandidatesBasedOnCellsValue();
    return this.board;
  }
  prepareGameBoard(){
    const cells = Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, i) => i);
    let removalCount = getRemovalCountBasedOnDifficulty(this.difficulty);
    console.log('removalCount', removalCount);
    while (removalCount > 0 && cells.length > 0) {
      const randIndex = Math.floor(Math.random() * cells.length);
      const cellIndex = cells.splice(randIndex, 1)[0];
      const cellValue = this.board[cellIndex].value;
      // Remove value from this cell
      addValueToCellIndex(this.board, cellIndex, null);
      // Reset candidates, only in model.
      this.resetCandidates();
      // const boardAnalysis = this.analyzeBoard();
      // console.log('addValueToCellIndex', removalCount, cellIndex, null);
      // console.log('boardAnalysis', boardAnalysis);

      removalCount--;
      // if (this.isValidAndEasyEnough(boardAnalysis, this.difficulty)) {
      //   removalCount--;
      // } else {
      //   // Reset - don't dig this cell
      //   addValueToCellIndex(this.board, cellIndex, cellValue);
      // }
    }
  };
  isValidAndEasyEnough(analysis: AnalyzeData, difficulty: Difficulty) {
    return (
      analysis.hasSolution &&
      analysis.difficulty &&
      analysis.hasUniqueSolution &&
      isEasyEnough(difficulty, analysis.difficulty)
    );
  }
  updateCandidatesBasedOnCellsValue() {
    const groupOfHousesLength = Sudoku.GROUP_OF_HOUSES.length;

    // console.log('class', 'updateCandidatesBasedOnCellsValue > Sudoku.GROUP_OF_HOUSES', Sudoku.GROUP_OF_HOUSES);
    // console.log('class', 'updateCandidatesBasedOnCellsValue > Sudoku.GROUP_OF_HOUSES', Sudoku.GROUP_OF_HOUSES);
    for (let houseType = 0; houseType < groupOfHousesLength; houseType++) {
      for (let houseIndex = 0; houseIndex < BOARD_SIZE; houseIndex++) {
        const house = Sudoku.GROUP_OF_HOUSES[houseType][houseIndex];
        const candidatesToRemove = this.getUsedNumbers(house);
        // console.log('class', 'updateCandidatesBasedOnCellsValue > candidatesToRemove', candidatesToRemove);
        for (let cellIndex = 0; cellIndex < BOARD_SIZE; cellIndex++) {
          const cell = this.board[house[cellIndex]];
          cell.candidates = cell.candidates.filter(
            (candidate) => !candidatesToRemove.includes(candidate),
          );
        }
      }
    }

    return false;
  }
  getUsedNumbers (house: House){
    // filter out cells that have values
    return house.map((cellIndex) => this.board[cellIndex].value).filter(Boolean);
  };
  generateBoardAnswerRecursively(cellIndex: number) {
    if (cellIndex + 1 > BOARD_SIZE * BOARD_SIZE) {
      this.board.forEach((cell) => (cell.invalidCandidates = []));
      return true;
    }
    if (this.setBoardCellWithRandomCandidate(cellIndex)) {
      // console.log('cellIndex', cellIndex);
      this.generateBoardAnswerRecursively(cellIndex + 1);
    } else {
      this.invalidPreviousCandidateAndStartOver(cellIndex);
    }
  };
  setBoardCellWithRandomCandidate(cellIndex: number) {
    this.updateCandidatesBasedOnCellsValue();
    const invalids = this.board[cellIndex].invalidCandidates || [];
    const candidates = this.board[cellIndex].candidates.filter(
      (candidate) => Boolean(candidate) && !invalids.includes(candidate),
    );
    if (candidates.length === 0) {
      return false;
    }
    const value = getRandomCandidateOfCell(candidates);
    // console.log('class', 'getRandomCandidateOfCell > candidates', candidates);
    // console.log('class', 'getRandomCandidateOfCell > value', value);
    addValueToCellIndex(this.board, cellIndex, value);
    return true;
  };

  invalidPreviousCandidateAndStartOver(cellIndex: number) {
    const previousIndex = cellIndex - 1;
    this.board[previousIndex].invalidCandidates =
    this.board[previousIndex].invalidCandidates || [];

    this.board[previousIndex].invalidCandidates?.push(this.board[previousIndex].value);

    addValueToCellIndex(this.board, previousIndex, null);
    this.resetCandidates();
    this.board[cellIndex].invalidCandidates = [];
    this.generateBoardAnswerRecursively(previousIndex);
  };
  analyzeBoard(onUpdate?: () => void) {
    let usedStrategiesClone = this.usedStrategies.slice();
    let boardClone = JSON.parse(JSON.stringify(this.board));

    let Continue: boolean | "value" | "elimination" = true;
    while (Continue) {
      Continue = this.applySolvingStrategies({
        strategyIndex: Continue === "elimination" ? 1 : 0,
        analyzeMode: true,
        onUpdate,
      });
    }
    const data: AnalyzeData = {
      hasSolution: isBoardFinished(this.board),
      hasUniqueSolution: false,
      usedStrategies: this.filterAndMapStrategies(this.strategies, this.usedStrategies),
    };

    if (data.hasSolution) {
      const boardDiff = this.calculateBoardDifficulty(this.usedStrategies, this.strategies);
      data.difficulty = boardDiff.difficulty;
      data.score = boardDiff.score;
    }
    const boardFinishedWithSolveAll = this.board.map(cell => cell.value);
    this.usedStrategies = usedStrategiesClone.slice();
    this.board = boardClone;

    usedStrategiesClone = this.usedStrategies.slice();
    boardClone = JSON.parse(JSON.stringify(this.board));

    let solvedBoard: false | Board = [...this.numberBoard];
    while (solvedBoard && !solvedBoard.every(Boolean)) {
      solvedBoard = this.solveStep({ analyzeMode: true, iterationCount: 0 });
    }

    if (data.hasSolution && typeof solvedBoard !== "boolean") {
      data.hasUniqueSolution =
        solvedBoard &&
        solvedBoard.every(
          (item, index) => item === boardFinishedWithSolveAll[index],
        );
    }
    this.usedStrategies = usedStrategiesClone.slice();
    this.board = boardClone;
    return data;
  }
  solveStep ({
    analyzeMode = false,
    iterationCount = 0,
    onUpdate,
  }: {
    analyzeMode?: boolean;
    iterationCount?: number;
    onUpdate?: (param: { strategy: string; updates: Update[]; type: "value" | "elimination" }) => void;
  } = {}): Board | false {
    const MAX_ITERATIONS = 30;
    if (iterationCount >= MAX_ITERATIONS) {
      return false;
    }

    const initialBoard = this.board.map(cell => cell.value).slice();
    const initialBoardCandidates = this.board.map(cell => cell.candidates).slice();
    this.applySolvingStrategies({ analyzeMode, onUpdate });
    const stepSolvedBoard = this.board.map(cell => cell.value).slice();
    const stepSolvedBoardCandidates = this.board.map(cell => cell.candidates).slice();
    // console.log('stepSolvedBoardCandidates', stepSolvedBoardCandidates);
    initialBoardCandidates.forEach((cell, i) => {
      const candidateIndex = stepSolvedBoardCandidates[i];
      const initialCandidates = cell;
      // diff 숫자 배열끼리 비교해서 달라진 것 찾기
      const diff: CellValue[] = initialCandidates.filter((x) => !candidateIndex.includes(x));
      if(diff.length > 0) {
        console.log('diff', i, diff);
      }
    });

    const boardNotChanged =
      initialBoard.filter(Boolean).length ===
      stepSolvedBoard.filter(Boolean).length;
    // console.log('solveStep > boardNotChanged', boardNotChanged);
    if (!isBoardFinished(this.board) && boardNotChanged) {
      return this.solveStep({ analyzeMode, iterationCount: iterationCount + 1, onUpdate });
    }
    this.board = this.convertInitialBoardToSerializedBoard(stepSolvedBoard);
    this.updateCandidatesBasedOnCellsValue();
    return this.numberBoard;
  };
  convertInitialBoardToSerializedBoard = (
    _board: Board,
  ): InternalBoard => {
    return new Array(BOARD_SIZE * BOARD_SIZE).fill(null).map((_, i) => {
      const value = _board[i] || null;
      const candidates =
        value === null ? [...CANDIDATES] : [...NULL_CANDIDATE_LIST];

      return { value, candidates };
    });
  };
  applySolvingStrategies({
    strategyIndex = 0,
    analyzeMode = false,
    onUpdate,
  }: {
    strategyIndex?: number;
    analyzeMode?: boolean;
    onUpdate?: (param: { strategy: string; updates: Update[]; type: "value" | "elimination" }) => void;
  } = {}): false | "elimination" | "value" {
    if (isBoardFinished(this.board)) {
      if (!analyzeMode) {
        this.onFinish?.(this.calculateBoardDifficulty(this.usedStrategies, this.strategies));
      }
      return false;
    }
    const effectedCells: boolean | -1 | Update[] =
      this.strategies[strategyIndex].fn();

    this.strategies[strategyIndex].postFn?.();
    // console.log('effectedCells', effectedCells);

    if (effectedCells === false) {
      if (this.strategies.length > strategyIndex + 1) {
        return this.applySolvingStrategies({
          strategyIndex: strategyIndex + 1,
          analyzeMode,
          onUpdate,
        });
      } else {
        this.onError?.({ message: "No More Strategies To Solve The Board" });
        return false;
      }
    }
    if (effectedCells === -1) {
      return false;
    }
    console.log('strategies[strategyIndex]', strategyIndex, this.strategies[strategyIndex].title);

    if (!analyzeMode) {
      onUpdate?.({
        strategy: this.strategies[strategyIndex].title,
        updates: effectedCells as Update[],
        type: this.strategies[strategyIndex].type,
      });
    }

    if (typeof this.usedStrategies[strategyIndex] === "undefined") {
      this.usedStrategies[strategyIndex] = 0;
    }

    this.usedStrategies[strategyIndex] += 1;
    return this.strategies[strategyIndex].type;
  };
  calculateBoardDifficulty(usedStrategies: number[], strategies: Strategy[])
    : { difficulty: Difficulty; score: number } 
    {
    const validUsedStrategies = usedStrategies.filter(Boolean);
    const totalScore = validUsedStrategies.reduce(
      (accumulatedScore, frequency, i) => {
        const strategy = strategies[i];
        return accumulatedScore + frequency * strategy.score;
      },
      0,
    );
    let difficulty: Difficulty =
      validUsedStrategies.length < 3
        ? DIFFICULTY_EASY
        : validUsedStrategies.length < 4
          ? DIFFICULTY_MEDIUM
          : DIFFICULTY_HARD;
  
    if (totalScore > 750) difficulty = DIFFICULTY_EXPERT;
    if (totalScore > 2000) difficulty = DIFFICULTY_MASTER;
  
    return {
      difficulty,
      score: totalScore,
    };
  }
  resetCandidates() {
    this.board = new Array(BOARD_SIZE * BOARD_SIZE).fill(null).map((_, index) => ({
      ...this.board[index],
      candidates:
        this.board[index].value == null
          ? CANDIDATES.slice()
          : this.board[index].candidates,
    }));
  };
  filterAndMapStrategies(
    strategies: Array<Strategy>,
    usedStrategies: Array<number>,
  ) {
    return strategies
      .map((strategy, i) =>
        usedStrategies[i] !== undefined
          ? { title: strategy.title, freq: usedStrategies[i] }
          : null,
      )
      .filter(Boolean);
  }

  strategies: Array<Strategy> = [
    {
      postFn: this.updateCandidatesBasedOnCellsValue.bind(this),
      title: "Open Singles Strategy",
      fn: this.openSinglesStrategy.bind(this),
      score: 0.1,
      type: "value",
    },
    {
      // postFn: updateCandidatesBasedOnCellsValue,
      postFn: this.updateCandidatesBasedOnCellsValue.bind(this),
      title: "Visual Elimination Strategy",
      // fn: visualEliminationStrategy,
      fn: this.visualEliminationStrategy.bind(this),
      score: 9,
      type: "value",
    },
    {
      // postFn: updateCandidatesBasedOnCellsValue,
      title: "Single Candidate Strategy",
      // fn: singleCandidateStrategy,
      fn: this.singleCandidateStrategy.bind(this),
      score: 8,
      type: "value",
    },
    {
      title: "Naked Pair Strategy",
      // fn: nakedPairStrategy,
      fn: this.nakedPairStrategy.bind(this),
      score: 50,
      type: "elimination",
    },
    {
      title: "Pointing Elimination Strategy",
      // fn: pointingEliminationStrategy,
      fn: this.pointingEliminationStrategy.bind(this),
      score: 80,
      type: "elimination",
    },
    {
      title: "Hidden Pair Strategy",
      // fn: hiddenPairStrategy,
      fn: this.hiddenPairStrategy.bind(this),
      score: 90,
      type: "elimination",
    },
    {
      title: "Naked Triplet Strategy",
      // fn: nakedTripletStrategy,
      fn: this.nakedTripletStrategy.bind(this),
      score: 100,
      type: "elimination",
    },
    {
      title: "Hidden Triplet Strategy",
      // fn: hiddenTripletStrategy,
      fn: this.hiddenTripletStrategy.bind(this),
      score: 140,
      type: "elimination",
    },
    {
      title: "Naked Quadruple Strategy",
      // fn: nakedQuadrupleStrategy,
      fn: this.nakedQuadrupleStrategy.bind(this),
      score: 150,
      type: "elimination",
    },
    {
      title: "Hidden Quadruple Strategy",
      // fn: hiddenQuadrupleStrategy,
      fn: this.hiddenQuadrupleStrategy.bind(this),
      score: 280,
      type: "elimination",
    },
  ];

  onFinish(args: { difficulty: Difficulty; score: number }) {

  }
  onError(options: { message: string }) {

  

  }
  onUpdate(options: { strategy: string; updates: Update[]; type: "value" | "elimination" }) {

  }
  //=======================================
  // strategies
  //=======================================

  openSinglesStrategy(): ReturnType<StrategyFn> {
    const groupOfHouses = Sudoku.GROUP_OF_HOUSES;

    for (let i = 0; i < groupOfHouses.length; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        const singleEmptyCell = this.findSingleEmptyCellInHouse(groupOfHouses[i][j]);

        if (singleEmptyCell) {
          return this.fillSingleEmptyCell(singleEmptyCell);
        }

        if (isBoardFinished(this.board)) {
          this.onFinish?.(calculateBoardDifficulty(this.usedStrategies, this.strategies));
          return true;
        }
      }
    }
    return false;
  }
  visualEliminationStrategy(): ReturnType<StrategyFn> | false {
    for (let cellIndex = 0; cellIndex < this.board.length; cellIndex++) {
      const cell = this.board[cellIndex];
      const candidates = cell.candidates;

      const possibleCandidates: CellValue[] = candidates.filter((candidate) => candidate !== null);
      // for (
      //   let candidateIndex = 0;
      //   candidateIndex < candidates.length;
      //   candidateIndex++
      // ) {
      //   if (candidates[candidateIndex] !== null) {
      //     possibleCandidates.push(candidates[candidateIndex]);
      //   }

      //   if (possibleCandidates.length > 1) {
      //     break; // can't find answer here
      //   }
      // }
      // if(possibleCandidates.length > 0) {
      //   console.debug('possibleCandidates', cellIndex, possibleCandidates);
      // }
      
      if (possibleCandidates.length === 1) {
        console.log('visualEliminationStrategy > candidate', this.board.map(cell => cell.candidates.join(',')));
        const digit = possibleCandidates[0];

        addValueToCellIndex(this.board, cellIndex, digit);

        return [{ index: cellIndex, filledValue: digit! }]; // one step at a time
      }
    }

    return false;
  }
  singleCandidateStrategy(): ReturnType<StrategyFn> | false {
    const groupOfHousesLength = Sudoku.GROUP_OF_HOUSES.length;

    for (let houseType = 0; houseType < groupOfHousesLength; houseType++) {
      for (let houseIndex = 0; houseIndex < BOARD_SIZE; houseIndex++) {
        const house = Sudoku.GROUP_OF_HOUSES[houseType][houseIndex];
        const digits = this.getRemainingNumbers(house);

        for (let digitIndex = 0; digitIndex < digits.length; digitIndex++) {
          const digit = digits[digitIndex];
          const possibleCells: number[] = [];

          for (let cellIndex = 0; cellIndex < BOARD_SIZE; cellIndex++) {
            const cell = house[cellIndex];
            const boardCell = this.board[cell];

            if (contains(boardCell.candidates, digit)) {
              possibleCells.push(cell);

              if (possibleCells.length > 1) {
                break; // we can't determine anything in this case
              }
            }
          }

          if (possibleCells.length === 1) {
            console.log('singleCandidateStrategy > candidate', this.board.map(cell => cell.candidates.join(',')));
            const cellIndex = possibleCells[0];
            addValueToCellIndex(this.board, cellIndex, digit);

            return [{ index: cellIndex, filledValue: digit }]; // one step at a time
          }
        }
      }
    }

    return false;
  }
  
  nakedCandidatesStrategy(
    number: number,
  ): ReturnType<StrategyFn> | false {
    type CombineInfo = {
      cell: number;
      candidates: Array<CellValue>;
    };

    let combineInfo: Array<CombineInfo> = [];
    let minIndexes = [-1];

    const groupOfHousesLength = Sudoku.GROUP_OF_HOUSES.length;

    for (let i = 0; i < groupOfHousesLength; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        const house = Sudoku.GROUP_OF_HOUSES[i][j];

        if (this.getRemainingNumbers(house).length <= number) {
          continue;
        }

        combineInfo = [];
        minIndexes = [-1];

        const result = checkCombinedCandidates(this, house, 0);

        if (result !== false) {
          return result;
        }
      }
    }

    return false;

    function checkCombinedCandidates(
      sudoku: Sudoku,
      house: House,
      startIndex: number,
    ): ReturnType<StrategyFn> | false {
      for (
        let i = Math.max(startIndex, minIndexes[startIndex]);
        i < BOARD_SIZE - number + startIndex;
        i++
      ) {
        minIndexes[startIndex] = i + 1;
        minIndexes[startIndex + 1] = i + 1;

        const cell = house[i];
        const cellCandidates = sudoku.getRemainingCandidates(cell);

        if (cellCandidates.length === 0 || cellCandidates.length > number) {
          continue;
        }

        if (combineInfo.length > 0) {
          const temp = [...cellCandidates];

          for (let a = 0; a < combineInfo.length; a++) {
            const candidates = combineInfo[a].candidates || [];
            for (let b = 0; b < candidates.length; b++) {
              if (!temp.includes(candidates[b])) {
                temp.push(candidates[b]);
              }
            }
          }

          if (temp.length > number) {
            continue;
          }
        }

        combineInfo.push({ cell, candidates: cellCandidates });

        if (startIndex < number - 1) {
          const result = checkCombinedCandidates(sudoku, house, startIndex + 1);

          if (result !== false) {
            return result;
          }
        }

        if (combineInfo.length === number) {
          const cellsWithCandidates: number[] = [];
          let combinedCandidates: Array<CellValue> = [];

          for (let x = 0; x < combineInfo.length; x++) {
            cellsWithCandidates.push(combineInfo[x].cell);
            combinedCandidates = combinedCandidates.concat(
              combineInfo[x].candidates || [],
            );
          }

          const cellsEffected = house.filter(
            (cell) => !cellsWithCandidates.includes(cell),
          );

          const cellsUpdated = sudoku.removeCandidatesFromMultipleCells(
            cellsEffected,
            combinedCandidates,
          );

          if (cellsUpdated.length > 0) {
            return cellsUpdated as Update[];
          }
        }
      }

      if (startIndex > 0) {
        if (combineInfo.length > startIndex - 1) {
          combineInfo.pop();
        }
      }

      return false;
    }
  }

  /* nakedPairStrategy
   * --------------
   * These strategies look for a group of 2, 3, or 4 cells in the same house that between them have exactly 2, 3, or 4 candidates. Since those candidates have to go in some cell in that group, they can be eliminated as candidates from other cells in the house. For example, if in a column two cells can only contain the numbers 2 and 3, then in the rest of that column, 2 and 3 can be removed from the candidate lists.
   * -----------------------------------------------------------------*/
  nakedPairStrategy() {
    return this.nakedCandidatesStrategy(2);
  }

  /* nakedTripletStrategy
   * --------------
   * These strategies look for a group of 2, 3, or 4 cells in the same house that between them have exactly 2, 3, or 4 candidates. Since those candidates have to go in some cell in that group, they can be eliminated as candidates from other cells in the house. For example, if in a column two cells can only contain the numbers 2 and 3, then in the rest of that column, 2 and 3 can be removed from the candidate lists.
   * -----------------------------------------------------------------*/
  nakedTripletStrategy() {
    return this.nakedCandidatesStrategy(3);
  }

  /* nakedQuadrupleStrategy
   * --------------
   * These strategies look for a group of 2, 3, or 4 cells in the same house that between them have exactly 2, 3, or 4 candidates. Since those candidates have to go in some cell in that group, they can be eliminated as candidates from other cells in the house. For example, if in a column two cells can only contain the numbers 2 and 3, then in the rest of that column, 2 and 3 can be removed from the candidate lists.
   * -----------------------------------------------------------------*/
  nakedQuadrupleStrategy() {
    return this.nakedCandidatesStrategy(4);
  }

  pointingEliminationStrategy(): ReturnType<StrategyFn> | false {
    console.log('pointingEliminationStrategy --------------------');
    const groupOfHousesLength = Sudoku.GROUP_OF_HOUSES.length;

    for (let houseType = 0; houseType < groupOfHousesLength; houseType++) {
      for (let houseIndex = 0; houseIndex < BOARD_SIZE; houseIndex++) {
        const house = Sudoku.GROUP_OF_HOUSES[houseType][houseIndex];
        const digits = this.getRemainingNumbers(house);

        console.log(`[${houseType}/${houseIndex}]house, digits`, house, digits);
        for (let digitIndex = 0; digitIndex < digits.length; digitIndex++) {
          const digit = digits[digitIndex];

          let sameAltHouse = true;
          let houseId = -1;
          let houseTwoId = -1;
          let sameAltTwoHouse = true;
          const cellsWithCandidate: number[] = [];

          for (let cellIndex = 0; cellIndex < house.length; cellIndex++) {
            const cell = house[cellIndex];

            if (contains(this.board[cell].candidates, digit)) {
              const cellHouses = this.housesWithCell(cell);
              const newHouseId =
                houseType === 2 ? cellHouses[0] : cellHouses[2];
              const newHouseTwoId =
                houseType === 2 ? cellHouses[1] : cellHouses[2];

              if (cellsWithCandidate.length > 0) {
                if (newHouseId !== houseId) {
                  sameAltHouse = false;
                }
                if (houseTwoId !== newHouseTwoId) {
                  sameAltTwoHouse = false;
                }
                if (sameAltHouse === false && sameAltTwoHouse === false) {
                  break; //not in the same altHouse (box/row)
                }
              }

              houseId = newHouseId;
              houseTwoId = newHouseTwoId;
              cellsWithCandidate.push(cell);
            }
          }
          console.log('digit, cellsWithCandidate', digit, cellsWithCandidate);

          if (
            (sameAltHouse || sameAltTwoHouse) &&
            cellsWithCandidate.length > 0
          ) {
            const altHouseType = houseType === 2 ? (sameAltHouse ? 0 : 1) : 2;
            const altHouse =
              Sudoku.GROUP_OF_HOUSES[altHouseType][
                this.housesWithCell(cellsWithCandidate[0])[altHouseType]
              ];
            const cellsEffected: number[] = [];

            for (let x = 0; x < altHouse.length; x++) {
              if (!cellsWithCandidate.includes(altHouse[x])) {
                cellsEffected.push(altHouse[x]);
              }
            }

            console.log('pointingEliminationStrategy > candidate', cellsEffected, digit);
            const cellsUpdated = this.removeCandidatesFromMultipleCells(
              cellsEffected,
              [digit],
            );

            if (cellsUpdated.length > 0) {
              return cellsUpdated as Update[];
            }
          }
        }
      }
    }

    return false;
  }

  /* hiddenLockedCandidates
  * These strategies are similar to the naked ones, but instead of looking for cells that only contain the group of candidates, they look for candidates that only appear in the group of cells. For example, if in a box, the numbers 2 and 3 only appear in two cells, then even if those cells have other candidates, you know that one of them has to be 2 and the other has to be 3, so you can remove any other candidates from those cells.
  * -----------------------------------------------------------------*/
  hiddenLockedCandidates(number: number) {
    let combineInfo: Array<{
      candidate: number;
      cells: Array<number>;
    }> = [];
    let minIndexes = [-1];
    function checkLockedCandidates(
      sudoku: Sudoku,
      house: House,
      startIndex: number,
    ): Update[] | boolean {
      //log("startIndex: "+startIndex);
      for (
        let i = Math.max(startIndex, minIndexes[startIndex]);
        i <= BOARD_SIZE - number + startIndex;
        i++
      ) {
        //log(i);
        //never check this cell again, in this loop
        minIndexes[startIndex] = i + 1;
        //or in a this loop deeper down in recursions
        minIndexes[startIndex + 1] = i + 1;

        const candidate = i + 1;
        //log(candidate);

        const possibleCells = sudoku.getPossibleCellsForCandidate(candidate, house);

        if (possibleCells.length === 0 || possibleCells.length > number)
          continue;

        //try adding this candidate and it's possible cells,
        //but first need to check that that doesn't make (unique) amount of
        //possible cells in combineInfo > n
        if (combineInfo.length > 0) {
          const temp = possibleCells.slice();
          for (let a = 0; a < combineInfo.length; a++) {
            const cells = combineInfo[a].cells;
            for (let b = 0; b < cells.length; b++) {
              if (!contains(temp, cells[b])) temp.push(cells[b]);
            }
          }
          if (temp.length > number) {
            //log("combined candidates spread over > n cells");
            continue; //combined candidates spread over > n cells, won't work
          }
        }

        combineInfo.push({ candidate: candidate, cells: possibleCells });

        if (startIndex < number - 1) {
          //still need to go deeper into combo
          const r = checkLockedCandidates(sudoku, house, startIndex + 1);
          //when we come back, check if that's because we found answer.
          //if so, return with it, otherwise, keep looking
          if (r !== false) return r;
        }
        //check if we match our pattern
        //if we have managed to combine n-1 candidates,
        //(we already know that cellsWithCandidates is <= n)
        //then we found a match!
        if (combineInfo.length === number) {
          //now we need to check whether this eliminates any candidates

          const combinedCandidates = []; //not unique now...
          let cellsWithCandidates: number[] = []; //not unique either..
          for (let x = 0; x < combineInfo.length; x++) {
            combinedCandidates.push(combineInfo[x].candidate);
            cellsWithCandidates = cellsWithCandidates.concat(
              combineInfo[x].cells,
            );
          }

          const candidatesToRemove = [];
          for (let c = 0; c < BOARD_SIZE; c++) {
            if (!contains(combinedCandidates, c + 1))
              candidatesToRemove.push(c + 1);
          }
          //log("candidates to remove:")
          //log(candidatesToRemove);

          //remove all other candidates from cellsWithCandidates
          const cellsUpdated = sudoku.removeCandidatesFromMultipleCells(
            cellsWithCandidates,
            candidatesToRemove,
          );

          //if it does remove candidates, we're succeeded!
          if (cellsUpdated.length > 0) {
            //log("hiddenLockedCandidates: ");
            //log(combinedCandidates);

            //filter out duplicates
            return cellsUpdated as Update[];
          }
        }
      }
      if (startIndex > 0) {
        //if we added a value to our combo check, but failed to find pattern, we now need drop that value and go back up in chain and continue to check..
        if (combineInfo.length > startIndex - 1) {
          combineInfo.pop();
        }
      }
      return false;
    }
    //for each type of house..(hor row / vert row / box)
    const groupOfHousesLength = Sudoku.GROUP_OF_HOUSES.length;
    for (let i = 0; i < groupOfHousesLength; i++) {
      //for each such house
      for (let j = 0; j < BOARD_SIZE; j++) {
        const house = Sudoku.GROUP_OF_HOUSES[i][j];
        if (this.getRemainingNumbers(house).length <= number)
          //can't eliminate any candidates
          continue;
        combineInfo = [];
        minIndexes = [-1];

        //checks every combo of n candidates in house, returns pattern, or false
        const result = checkLockedCandidates(this, house, 0);
        if (result !== false) return result;
      }
    }
    return false; //pattern not found
  }

  /* hiddenPairStrategy
    * --------------
    * These strategies are similar to the naked ones, but instead of looking for cells that only contain the group of candidates, they look for candidates that only appear in the group of cells. For example, if in a box, the numbers 2 and 3 only appear in two cells, then even if those cells have other candidates, you know that one of them has to be 2 and the other has to be 3, so you can remove any other candidates from those cells.
    * -----------------------------------------------------------------*/
  hiddenPairStrategy() {
    return this.hiddenLockedCandidates(2);
  }

  /* hiddenTripletStrategy
    * --------------
    * These strategies are similar to the naked ones, but instead of looking for cells that only contain the group of candidates, they look for candidates that only appear in the group of cells. For example, if in a box, the numbers 2 and 3 only appear in two cells, then even if those cells have other candidates, you know that one of them has to be 2 and the other has to be 3, so you can remove any other candidates from those cells.
    * -----------------------------------------------------------------*/
  hiddenTripletStrategy() {
    return this.hiddenLockedCandidates(3);
  }

  /* hiddenQuadrupleStrategy
    * --------------
    * These strategies are similar to the naked ones, but instead of looking for cells that only contain the group of candidates, they look for candidates that only appear in the group of cells. For example, if in a box, the numbers 2 and 3 only appear in two cells, then even if those cells have other candidates, you know that one of them has to be 2 and the other has to be 3, so you can remove any other candidates from those cells.
    * -----------------------------------------------------------------*/
  hiddenQuadrupleStrategy() {
    return this.hiddenLockedCandidates(4);
  }
  
  findSingleEmptyCellInHouse(house: House) {
    const emptyCells = [];

    for (let k = 0; k < BOARD_SIZE; k++) {
      const boardIndex = house[k];
      if (this.board[boardIndex].value == null) {
        emptyCells.push({ house: house, cellIndex: boardIndex });
        if (emptyCells.length > 1) {
          break;
        }
      }
    }

    // If only one empty cell found
    return emptyCells.length === 1 ? emptyCells[0] : null;
  }

  fillSingleEmptyCell(emptyCell: {
    house: number[];
    cellIndex: number;
  }) {
    const value = this.getRemainingNumbers(emptyCell.house);

    if (value.length > 1) {
      this.onError?.({ message: "Board Incorrect" });
      return -1;
    }
    // console.log('fillSingleEmptyCell > candidate', this.board.map(cell => cell.candidates.join(',')));
    addValueToCellIndex(this.board, emptyCell.cellIndex, value[0]); //does not update UI
    return [{ index: emptyCell.cellIndex, filledValue: value[0] }];
  }
  getRemainingNumbers (house: House): Array<number> {
    const usedNumbers = this.getUsedNumbers(house);

    return CANDIDATES.filter((candidate) => !usedNumbers.includes(candidate));
  };
  getRemainingCandidates (cellIndex: number): Array<CellValue> {
    return this.board[cellIndex].candidates.filter(
      (candidate) => candidate !== null,
    );
  };
  removeCandidatesFromMultipleCells (
    cells: Array<number>,
    candidates: Array<CellValue>,
  ): Array<{ index: number; eliminatedCandidate: number }> {
    const cellsUpdated = [];
    for (let i = 0; i < cells.length; i++) {
      const cellCandidates = this.board[cells[i]].candidates; // 셀의 후보군 숫자 배열, ex) [2, 3, 4]
      console.log('removeCandidatesFromMultipleCells', cells, i, candidates);
      console.log('removeCandidatesFromMultipleCells > cellCandidates', cellCandidates);

      for (let j = 0; j < candidates.length; j++) {
        const candidate = candidates[j];  // 삭제 대상 후보 숫자 ex) 2
        //-1 because candidate '1' is at index 0 etc.
        // 숫자이고, 후보군에 포함되어 있으면
        if(candidate && cellCandidates.includes(candidate)){
          console.log('cellCandidates 에 candidate 포함', candidate);
        }
        // if (candidate && cellCandidates[candidate - 1] !== null) {
        if (candidate && cellCandidates.includes(candidate) === true) {
          cellCandidates[candidate - 1] = null; //NOTE: also deletes them from board variable
          cellsUpdated.push({
            index: cells[i],
            eliminatedCandidate: candidate,
          }); //will push same cell multiple times
        }
      }
    }
    console.log('removeCandidatesFromMultipleCells > cellsUpdated', cells, candidates, cellsUpdated);
    return cellsUpdated;
  };
  getPossibleCellsForCandidate (candidate: number, house: House) {
    return house.filter((cellIndex) =>
      this.board[cellIndex].candidates.includes(candidate),
    );
  };
  housesWithCell (cellIndex: number) {
    const boxSideSize = Math.sqrt(BOARD_SIZE);
    const groupOfHouses = [];
    //horizontal row
    const horizontalRow = Math.floor(cellIndex / BOARD_SIZE);
    groupOfHouses.push(horizontalRow);
    //vertical row
    const verticalRow = Math.floor(cellIndex % BOARD_SIZE);
    groupOfHouses.push(verticalRow);
    //box
    const box =
      Math.floor(horizontalRow / boxSideSize) * boxSideSize +
      Math.floor(verticalRow / boxSideSize);
    groupOfHouses.push(box);

    return groupOfHouses;
  };
  solveAll(): Board {
    let Continue: boolean | "value" | "elimination" = true;
    while (Continue) {
      Continue = this.applySolvingStrategies({
        strategyIndex: Continue === "elimination" ? 1 : 0,
      });
    }
    return this.numberBoard;
  }
  solve(): SolvingResult {
    const solvingSteps: SolvingStep[] = [];
    const analysis = this.analyzeBoard();
  
    if (!analysis.hasSolution) {
      return { solved: false, error: "No solution for provided board!" };
    }
  
    const board = this.solveAll();
  
    if (!analysis.hasUniqueSolution) {
      return {
        solved: true,
        board,
        steps: solvingSteps,
        analysis,
        error: "No unique solution for provided board!",
      };
    }
  
    return { solved: true, board, steps: solvingSteps, analysis };
  }
}