

interface Cell {
  digit: number;  // 채워진 값. 0-9
  input: boolean;  // 사용자 입력 여부
  candidateList: number[];  // 후보 값. 0-9
  invalidCandidateList: number[];  // 불가능한 후보값
  index: number;  // 0-80
  row: number;  // 0-8
  col: number;  // 0-8
  box: number;  // 0-8
}
interface Board {
  cells: Cell[];
}

interface Hint {
  index: number;
  digit?: number;
  candidateList?: number[];
}

const boxIndexList = [
  [0, 1, 2, 9, 10, 11, 18, 19, 20], // 1, 1
  [3, 4, 5, 12, 13, 14, 21, 22, 23],  // 1, 2
  [6, 7, 8, 15, 16, 17, 24, 25, 26],  // 1, 3
  [27, 28, 29, 36, 37, 38, 45, 46, 47],  // 2, 1
  [30, 31, 32, 39, 40, 41, 48, 49, 50],  // 2, 2
  [33, 34, 35, 42, 43, 44, 51, 52, 53],  // 2, 3
  [54, 55, 56, 63, 64, 65, 72, 73, 74],  // 3, 1
  [57, 58, 59, 66, 67, 68, 75, 76, 77],  // 3, 2
  [60, 61, 62, 69, 70, 71, 78, 79, 80],  // 3, 3
];
const rowIndexList = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8],  // 1
  [9, 10, 11, 12, 13, 14, 15, 16, 17],  // 2
  [18, 19, 20, 21, 22, 23, 24, 25, 26],  // 3
  [27, 28, 29, 30, 31, 32, 33, 34, 35],  // 4
  [36, 37, 38, 39, 40, 41, 42, 43, 44],  // 5
  [45, 46, 47, 48, 49, 50, 51, 52, 53],  // 6
  [54, 55, 56, 57, 58, 59, 60, 61, 62],  // 7
  [63, 64, 65, 66, 67, 68, 69, 70, 71],  // 8
  [72, 73, 74, 75, 76, 77, 78, 79, 80],  // 9
];
const colIndexList = [
  [0, 9, 18, 27, 36, 45, 54, 63, 72],  // 1
  [1, 10, 19, 28, 37, 46, 55, 64, 73],  // 2
  [2, 11, 20, 29, 38, 47, 56, 65, 74],  // 3
  [3, 12, 21, 30, 39, 48, 57, 66, 75],  // 4
  [4, 13, 22, 31, 40, 49, 58, 67, 76],  // 5
  [5, 14, 23, 32, 41, 50, 59, 68, 77],  // 6
  [6, 15, 24, 33, 42, 51, 60, 69, 78],  // 7
  [7, 16, 25, 34, 43, 52, 61, 70, 79],  // 8
  [8, 17, 26, 35, 44, 53, 62, 71, 80],  // 9
];

/**
 * # LHS Sudoku
 * 
 * TODO 히스토리
 * TODO 힌트 (전략)
 */
export class LHSSudoku {
  board: Board;
  
  constructor() {
    this.board = this.initializeBoard();
  }

  initializeBoard(): Board {
    // 81개 셀을 가진 보드를 생성한다.
    // 후보군은 1-9로 초기화한다.
    // row, col, index 는 index 에 따라서 초기화한다.
    const newBoard = {
      cells: Array.from({length: 81}, (_, index) => {
        return {
          digit: 0,
          candidateList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          invalidCandidateList: [],
          index,
          row: Math.floor(index / 9),
          col: index % 9,
          box: Math.floor(Math.floor(index / 9) / 3) * 3 + Math.floor(index % 9 / 3),
        }
      })
    }
    return newBoard;
  }
  /**
   * # 첫번째 박스의 행렬을 1~9로 랜덤하게 채운다.
   */
  public generateFirstBoxMatrix() {
    const firstBoxIndexList = boxIndexList[0];
    // 1-9 랜덤하게 섞는다.
    const randomCandidateList = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
    firstBoxIndexList.forEach((index) => {
      const cell = this.board.cells[index];
      const randomCandidate = randomCandidateList.pop();
      this.setNumberCell(cell, randomCandidate!);
    });
  }
  /**
   * # 1 ~ 8 박스의 행렬을 차례대로 채운다.
   * @param boxIndex 생성할 박스 인덱스 (0 ~ 8)
   * @returns 
   */
  public generateMatrixMultiple(boxIndex: number) {
    const x1Matrix = [[0, 0, 1], [1, 0, 0], [0, 1, 0]];
    const x2Matrix = [[0, 1, 0], [0, 0, 1], [1, 0, 0]];

    if(boxIndex === 0) {
      this.generateFirstBoxMatrix();
      return;
    } else if(boxIndex === 1) {
      // S1 = X2 * S0
      const s0 = Helper.numberArrayToMatrix((Helper.extractCellDigit(this.getBoxMatrix(0))), 3, 3);
      const s1 = Helper.matrixMultiply(x2Matrix, s0, 3, 3);
      // s1를 box[1] 셀에 채운다.
      const box = this.getBoxMatrix(1);
      box.forEach((cell, index) => {
        const targetDigit = s1[Math.floor(index / 3)][index % 3];
        this.setNumberCell(cell, targetDigit);
      });
    } else if(boxIndex === 2) {
      // S2 = X1 * S0
      const s0 = Helper.numberArrayToMatrix((Helper.extractCellDigit(this.getBoxMatrix(0))), 3, 3);
      const s2 = Helper.matrixMultiply(x1Matrix, s0, 3, 3);
      // s2를 box[2] 셀에 채운다.
      const box = this.getBoxMatrix(2);
      box.forEach((cell, index) => {
        const targetDigit = s2[Math.floor(index / 3)][index % 3];
        this.setNumberCell(cell, targetDigit);
      });
    } else if(boxIndex === 3) {
      // S3 = S0 * X1
      const s0 = Helper.numberArrayToMatrix((Helper.extractCellDigit(this.getBoxMatrix(0))), 3, 3);
      const s3 = Helper.matrixMultiply(s0, x1Matrix, 3, 3);
      // s3를 box[3] 셀에 채운다.
      const box = this.getBoxMatrix(3);
      box.forEach((cell, index) => {
        const targetDigit = s3[Math.floor(index / 3)][index % 3];
        this.setNumberCell(cell, targetDigit);
      });
    } else if(boxIndex === 4) {
      // S4 = X2 * S0 * X1
      const s0 = Helper.numberArrayToMatrix((Helper.extractCellDigit(this.getBoxMatrix(0))), 3, 3);
      let s4 = Helper.matrixMultiply(x2Matrix, s0, 3, 3);
      s4 = Helper.matrixMultiply(s4, x1Matrix, 3, 3);
      // s4를 box[4] 셀에 채운다.
      const box = this.getBoxMatrix(4);
      box.forEach((cell, index) => {
        const targetDigit = s4[Math.floor(index / 3)][index % 3];
        this.setNumberCell(cell, targetDigit);
      });
    } else if(boxIndex === 5) {
      // S5 = X1 * S0 * X1
      const s0 = Helper.numberArrayToMatrix((Helper.extractCellDigit(this.getBoxMatrix(0))), 3, 3);
      let s5 = Helper.matrixMultiply(x1Matrix, s0, 3, 3);
      s5 = Helper.matrixMultiply(s5, x1Matrix, 3, 3);
      // s5를 box[5] 셀에 채운다.
      const box = this.getBoxMatrix(5);
      box.forEach((cell, index) => {
        const targetDigit = s5[Math.floor(index / 3)][index % 3];
        this.setNumberCell(cell, targetDigit);
      });
    } else if(boxIndex === 6) {
      // S6 = S0 * X2
      const s0 = Helper.numberArrayToMatrix((Helper.extractCellDigit(this.getBoxMatrix(0))), 3, 3);
      const s6 = Helper.matrixMultiply(s0, x2Matrix, 3, 3);
      // s6를 box[6] 셀에 채운다.
      const box = this.getBoxMatrix(6);
      box.forEach((cell, index) => {
        const targetDigit = s6[Math.floor(index / 3)][index % 3];
        this.setNumberCell(cell, targetDigit);
      });
    } else if(boxIndex === 7) {
      // S7 = X2 * S0 * X2
      const s0 = Helper.numberArrayToMatrix((Helper.extractCellDigit(this.getBoxMatrix(0))), 3, 3);
      let s7 = Helper.matrixMultiply(x2Matrix, s0, 3, 3);
      s7 = Helper.matrixMultiply(s7, x2Matrix, 3, 3);
      // s7를 box[7] 셀에 채운다.
      const box = this.getBoxMatrix(7);
      box.forEach((cell, index) => {
        const targetDigit = s7[Math.floor(index / 3)][index % 3];
        this.setNumberCell(cell, targetDigit);
      });
    } else if(boxIndex === 8) {
      //  S8 = X1 * S0 * X2
      const s0 = Helper.numberArrayToMatrix((Helper.extractCellDigit(this.getBoxMatrix(0))), 3, 3);
      let s8 = Helper.matrixMultiply(x1Matrix, s0, 3, 3);
      s8 = Helper.matrixMultiply(s8, x2Matrix, 3, 3);
      // s8를 box[8] 셀에 채운다.
      const box = this.getBoxMatrix(8);
      box.forEach((cell, index) => {
        const targetDigit = s8[Math.floor(index / 3)][index % 3];
        this.setNumberCell(cell, targetDigit);
      });
    }
  }
  /**
   * # 박스의 행렬을 가져온다.
   * @param boxIndex 0 ~ 8
   * @returns {Cell[]}
   */
  getBoxMatrix(boxIndex: number): Cell[] {
    const box = boxIndexList[boxIndex];
    const boxCellList = box.map((index) => this.board.cells[index]);
    return boxCellList;
  }
  /**
   * # 1~3, 4~6, 7~9 행의 순서를 섞는다.
   */
  public mixVerticalRow() {
    // 1~3, 4~6, 7~9 행을 랜덤으로 뽑는다
    const randomIndex = Math.floor(Math.random() * 3);
    
    // n~n+2 에서 두 행을 골른다. 0~2 중 두개를 랜덤하게 고른다.
    const selectedRowIndex = [0, 1, 2].sort(() => Math.random() - 0.5).slice(0, 2);
    const row1 = rowIndexList[randomIndex * 3 + selectedRowIndex[0]];
    const row2 = rowIndexList[randomIndex * 3 + selectedRowIndex[1]];
    // 두 행의 digit을 평행하게 서로 바꾼다. swap
    for(let i = 0; i < row1.length; i++) {
      const temp = this.board.cells[row1[i]].digit;
      this.board.cells[row1[i]].digit = this.board.cells[row2[i]].digit;
      this.board.cells[row2[i]].digit = temp;
    }
  }
  /**
   * # 1~3, 4~6, 7~9 열의 순서를 섞는다.
   */
  public mixHorizontalColumn() {
    // 1~3, 4~6, 7~9 열을 랜덤으로 뽑는다
    const randomIndex = Math.floor(Math.random() * 3);
    
    // n~n+2 에서 두 열을 골른다. 0~2 중 두개를 랜덤하게 고른다.
    const selectedColIndex = [0, 1, 2].sort(() => Math.random() - 0.5).slice(0, 2);
    const col1 = colIndexList[randomIndex * 3 + selectedColIndex[0]];
    const col2 = colIndexList[randomIndex * 3 + selectedColIndex[1]];
    // 두 열의 digit을 수직하게 서로 바꾼다. swap
    for(let i = 0; i < col1.length; i++) {
      const temp = this.board.cells[col1[i]].digit;
      this.board.cells[col1[i]].digit = this.board.cells[col2[i]].digit;
      this.board.cells[col2[i]].digit = temp;
    }
  }
  public mixVerticalBox() {
  }
  public mixHorizontalBox() {
  }
  /**
   * # 숫자 두개를 골라, 서로 치환한다.
   * - 예를들어 1과 9를 골라 서로 바꾼다.
   */
  public mixReplaceDigit() {
    // 1~9 중 2개를 랜덤하게 고른다.
    const randomList = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5).slice(0, 2);
    const digit1 = randomList[0];
    const digit2 = randomList[1];
    // digit1 인 cell, digit2 인 cell을 가져온다.
    const digit1CellList = this.board.cells.filter((cell) => cell.digit === digit1);
    const digit2CellList = this.board.cells.filter((cell) => cell.digit === digit2);
    // digit1 cell에는 digit2를, digit2 cell에는 digit1을 넣는다.
    digit1CellList.forEach((cell) => {
      cell.digit = digit2;
    });
    digit2CellList.forEach((cell) => {
      cell.digit = digit1;
    });
  }
  /**
   * # 후보군이 하나인 셀을 찾아서 숫자를 채운다.
   */
  public onlyOneCandidate() {
    for(let i = 0; i < 81; i++) {
      const cell = this.board.cells[i];
      if(cell.digit === 0 && cell.candidateList.length === 1) {
        this.setNumberCell(cell, cell.candidateList[0]);
        return { index: cell.index, digit: cell.candidateList[0] };
      }
    }
    return null;
  }

  /**
   * # 후보군 랜덤 방식으로 숫자를 채운다.
   * - 랜덤으로 후보군을 선택한다.
   * @fail => 후보군이 아예 없어지는 케이스가 생긴다..
   * @return {number} cell index
   */
  public generateOneCellCandidateRandom(): number {
    const one = this.onlyOneCandidate();
    if(one !== null) {
      // 후보군이 하나인 경우
      return one.index;
    }
    const emptyCellList = this.board.cells.filter((cell) => cell.digit === 0)
    // 랜덤으로 후보군을 선택한다.
    const randomIndex = Math.floor(Math.random() * emptyCellList.length);
    // 해당 셀의 후보군 중 랜덤으로 선택한다.
    const cell = emptyCellList[randomIndex];
    const randomCandidateIndex = Math.floor(Math.random() * cell.candidateList.length);
    // 셀에 값을 채운다.
    const randomCandidate = cell.candidateList[randomCandidateIndex];
    // this.setNumberCell(cell, randomCandidate);
    return cell.index;
  }
  /**
   * # 안전한 숫자를 recursive하게 채운다.
   */
  public generateOneRandomSafe(index: number): boolean {
    if(index == null) {
      return false;
    }
    const cell = this.board.cells[index];
    // console.log('generateOneRandomSafe > cell', index, cell);
    if(!cell) {
      return true;
    }
    if(cell.digit !== 0) {
      // console.log('generateOneRandomSafe > cell.digit !== 0');
      cell.digit = 0;
      const adjacentCellList = this.getAllAdjacentCell(cell);
      adjacentCellList.forEach((cell) => {
        this.calculateCellCandidate(cell);
      });
      // return false;
    }
    // invalidCandidateList 에 있는 후보군을 제거한다.
    const availableCandidateList = cell.candidateList.filter((c) => !cell.invalidCandidateList.includes(c));
    // 탈출 로직
    // 후보군이 없는 경우 이전셀을 초기화하고, 불가능한 후보군을 추가한다.
    if(availableCandidateList.length === 0) {
      const previousIndex = index - 1;
      const previouseCell = this.board.cells[previousIndex];
      previouseCell.invalidCandidateList.push(previouseCell.digit);
      previouseCell.digit = 0;
      cell.invalidCandidateList = [];
      // console.log('generateOneRandomSafe > no candidate', previouseCell.invalidCandidateList);
      const adjacentCellList = this.getAllAdjacentCell(previouseCell);
      adjacentCellList.forEach((ajcell) => {
        this.calculateCellCandidate(ajcell);
      });
      return this.generateOneRandomSafe(previousIndex);;
    }
    const randomCandidateIndex = Math.floor(Math.random() * availableCandidateList.length);
    const randomCandidate = availableCandidateList[randomCandidateIndex];
    this.setNumberCell(cell, randomCandidate);
    return this.generateOneRandomSafe(index + 1);
  }

  /**
   * # 완성된 보드에서 숫자를 랜덤하게 제거한다.
   */
  public removeDigitRandom(removeCount: number) {
    for(let i = 0; i < removeCount; i++) {
      const randomIndex = Math.floor(Math.random() * 81);
      const cell = this.board.cells[randomIndex];
      cell.digit = 0;
      // 숫자가 없는 셀의 후보군을 다시 계산한다.
      this.calculateAllEmptyCellCandidate();
    }
  }

  /**
   * # 가로줄, 세로줄, 3x3 블록에 후보자를 제거 
   * @param row 
   * @param col 
   * @param digit 
   * @call removeCandidateCell
   */
  removeCandidate(row: number, col: number, digit: number): void {
    const block = Math.floor(row / 3) * 3 + Math.floor(col / 3);
    // console.log('removeCandidate', row, col, block, digit);
    // 가로줄, 세로줄, 3x3 블록에 후보자를 제거
    const rowList = rowIndexList[row];
    const colList = colIndexList[col];
    const boxList = boxIndexList[block];
    rowList.forEach((index) => {
      this.removeCandidateCell(this.board.cells[index], digit);
    });
    colList.forEach((index) => {
      this.removeCandidateCell(this.board.cells[index], digit);
    });
    boxList.forEach((index) => {
      this.removeCandidateCell(this.board.cells[index], digit);
    });
  }
  /**
   * # 해당 셀의 후보군에서 특정 숫자를 제거
   * @param cell
   * @modifed cell.candidateList
   * @param digit 
   */
  removeCandidateCell(cell: Cell, digit: number): void {
    cell.candidateList = cell.candidateList.filter((c) => c !== digit);
  }
  /**
   * # 셀의 후보군을 다시 계산한다.
   * - 가로줄, 세로줄, 3x3 블록의 숫자들을 후보군에서 제거한다.
   * @param cell 
   */
  calculateCellCandidate(cell: Cell) {
    if(cell.digit !== 0) {
      // cell.candidateList = [];
      return;
    }
    cell.candidateList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const row = cell.row;
    const col = cell.col;
    const block = cell.box;
    const rowList = rowIndexList[row];
    const colList = colIndexList[col];
    const boxList = boxIndexList[block];
    rowList.forEach((index) => {
      this.removeCandidateCell(cell, this.board.cells[index].digit);
    });
    colList.forEach((index) => {
      this.removeCandidateCell(cell, this.board.cells[index].digit);
    });
    boxList.forEach((index) => {
      this.removeCandidateCell(cell, this.board.cells[index].digit);
    });
  }
  /**
   * # 모든 빈 셀의 후보군을 다시 계산한다.
   * @call calculateCellCandidate
   */
  calculateAllEmptyCellCandidate() {
    this.board.cells.forEach((cell) => {
      this.calculateCellCandidate(cell);
    });
  }
  /**
   * # 가로, 세로, 3x3 블록의 cell을 가져온다.
   * @param cell 
   */
  getAllAdjacentCell(cell: Cell): Cell[] {
    const rowList = rowIndexList[cell.row];
    const colList = colIndexList[cell.col];
    const boxList = boxIndexList[cell.box];
    const adjacentCellList = rowList.concat(colList, boxList).map((index) => this.board.cells[index]);
    return adjacentCellList;
  }
  /**
   * # 숫자 기입
   * - 관련 후보군 제거
   * @param index 
   * @param digit 
   */
  setNumberIndex(index: number, digit: number, input: boolean = false) {
    const cell = this.board.cells[index];
    // 셀에 숫자 기입
    cell.digit = digit;
    cell.input = input;
    cell.candidateList = [];
    this.removeCandidate(cell.row, cell.col, digit);
  }
  /**
   * # 숫자 기입
   * - 관련 후보군 제거
   * @param cell 
   * @param digit 
   */
  setNumberCell(cell: Cell, digit: number, input: boolean = false) {
    // 셀에 숫자 기입
    cell.digit = digit;
    cell.input = input;
    cell.candidateList = [];
    this.removeCandidate(cell.row, cell.col, digit);
  }


  //==============================================================

  /**
   * # 후보군이 하나만 있는 셀을 찾는다.
   * @hint 
   * @returns 
   */
  hintNakedSingleCandidate(): Hint | null {
    for(let i = 0; i < 81; i++) {
      const cell = this.board.cells[i];
      if(cell.digit === 0 && cell.candidateList.length === 1) {
        return { index: cell.index, digit: cell.candidateList[0] };
      }
    }
    return null;
  }

  /**
   * # 셀의 세로줄에서 후보군이 하나만 있는 셀을 찾는다.
   * - 모든 후보군을 가져와서, 세로줄에서 후보군이 하나만 있는 셀을 찾는다.
   */
  hintSingleVerticalCandidate(): Hint | null {
    for(let i = 0; i < 9; i++) {
      const colList = colIndexList[i];
      const colCandidateList = colList.map((index) => this.board.cells[index].candidateList).flat();
      // flat 후보군 중에서 숫자 하나만 있는 목록
      const singleCandidateList = colCandidateList.filter((c) => colCandidateList.filter((cc) => cc === c).length === 1);
      if(singleCandidateList.length > 0) {
        const singleCandidate = singleCandidateList[0]; // 단일 후보 숫자
        const singleCell = colList.find((index) => this.board.cells[index].candidateList.includes(singleCandidate));
        return { index: singleCell!, digit: singleCandidate };
      }
    }
    return null;
  }
  /**
   * # 셀의 가로줄에서 후보군이 하나만 있는 셀을 찾는다.
   * - 모든 후보군을 가져와서, 가로줄에서 후보군이 하나만 있는 셀을 찾는다.
   */
  hintSingleHorizontalCandidate(): Hint | null {
    for(let i = 0; i < 9; i++) {
      const rowList = rowIndexList[i];
      const rowCandidateList = rowList.map((index) => this.board.cells[index].candidateList).flat();
      // flat 후보군 중에서 숫자 하나만 있는 목록
      const singleCandidateList = rowCandidateList.filter((c) => rowCandidateList.filter((cc) => cc === c).length === 1);
      if(singleCandidateList.length > 0) {
        const singleCandidate = singleCandidateList[0]; // 단일 후보 숫자
        const singleCell = rowList.find((index) => this.board.cells[index].candidateList.includes(singleCandidate));
        return { index: singleCell!, digit: singleCandidate };
      }
    }
    return null;
  }
  /**
   * # 셀의 3x3 블록에서 후보군이 하나만 있는 셀을 찾는다.
   * - 모든 후보군을 가져와서, 3x3 블록에서 후보군이 하나만 있는 셀을 찾는다.
   */
  hintSingleBoxCandidate(): Hint | null {
    for(let i = 0; i < 9; i++) {
      const boxList = boxIndexList[i];
      const boxCandidateList = boxList.map((index) => this.board.cells[index].candidateList).flat();
      // flat 후보군 중에서 숫자 하나만 있는 목록
      const singleCandidateList = boxCandidateList.filter((c) => boxCandidateList.filter((cc) => cc === c).length === 1);
      if(singleCandidateList.length > 0) {
        const singleCandidate = singleCandidateList[0]; // 단일 후보 숫자
        const singleCell = boxList.find((index) => this.board.cells[index].candidateList.includes(singleCandidate));
        return { index: singleCell!, digit: singleCandidate };
      }
    }
    return null;
  }
  /**
   * # LockEliminate 전략
   * 대상에서 같은 두 숫자의 후보군을 찾아서, 다른 셀에서 해당 숫자를 제거한다.
   * [7,9,6],[],[],[7,9],[],[4,7,9],[],[],[7,9] 인 경우 [7,9]를 찾는다.
   * 다른 셀에서 7, 9가 제거대상이다. 
   * 다른 셀에서의 7,9 를 힌트로 반환한다.
   * @param searchIndexList 
   * @returns 
   */
  lockEliminate2Pair(searchIndexList: number[],): Hint[] | null {
    const hintList: Hint[] = [];
    const searchCellList = searchIndexList.map((index) => this.board.cells[index]).filter((cell) => cell.digit === 0);  // 탐색 대상 빈 셀
    const activeIndexList = searchCellList.map((cell) => cell.index); // 탐색 대상 빈 셀의 인덱스 목록
    // 빈 셀이 2개일 때 굳이 진행 안함
    if(searchCellList.length === 2) {
      null;
    }
    
    const twoPairList: Cell[] = searchCellList
      .map((searchCell) => this.board.cells[searchCell.index])
      .filter((c) => c.candidateList.length === 2); // 빈 셀 중 후보군이 2개인 셀만 추출
    const twoPairIndexList = twoPairList.map((c) => c.index); // 빈 셀 중 후보군이 2개인 셀의 인덱스 목록
    // 두 후보군 배열이 같은 경우
    console.log('twoPairList', twoPairList);
    // 2개 이상일 때
    if(twoPairList.length > 1) {
      for(let j = 0; j < twoPairList.length; ++j) {
        for(let k = j + 1; k < twoPairList.length; ++k) {
          // if(twoPairList[j].candidateList.join('') === twoPairList[k].candidateList.join('')) {
          if(Helper.isArraysEqual(twoPairList[j].candidateList, twoPairList[k].candidateList)) {
            // 같은 쌍을 찾았다
            const pairCandidateList = twoPairList[j].candidateList; // 같은 후보군 숫자
            const lockedIndexList = [twoPairList[j].index, twoPairList[k].index]; // 두 쌍 인덱스
            const otherIndexList = Helper.excludeArray(activeIndexList, lockedIndexList); // 두 쌍 제외 빈 셀 인덱스
            const otherCellList = otherIndexList.map((index) => this.board.cells[index]); // 두 쌍 제외 빈 셀 목록
            console.log('pairCandidateList', pairCandidateList);
            console.log('otherCellList', otherCellList);
            if(otherCellList.length > 0) {
              // 나머지 셀들 중 후보군에서 제거할 숫자를 찾아서 hint 에 넣는다.
              otherCellList.forEach((cell) => {
                const hint: Hint = { index: cell.index, candidateList: [] };
                const intersection = Helper.intersectionArray(cell.candidateList, pairCandidateList); // 대상 셀과 제거 후보군의 교집합
                hint.candidateList = intersection;
                // 제거할 후보군이 있을 때만 힌트에 추가한다.
                if(hint.candidateList!.length > 0) {
                  hintList.push(hint);
                }
              });
            }
          }
        }
      }
    }
    return hintList;
  }
  /**
   * # 셀의 세로줄에서 LockEliminate
   */
  hintLockEliminate2PairVertical(): Hint[] | null {
    const hintList: Hint[] = [];
    for(let i = 0; i < 9; ++i) {
      const colList = colIndexList[i];
      const resultHint = this.lockEliminate2Pair(colList);
      if(resultHint) {
        hintList.push(...resultHint);
      }
    }
    return hintList.length > 0 ? hintList : null;
  }
  /**
   * # 셀의 가로줄에서 LockEliminate
   */
  hintLockEliminate2PairHorizontal(): Hint[] | null {
    const hintList: Hint[] = [];
    for(let i = 0; i < 9; ++i) {
      const rowList = rowIndexList[i];
      const resultHint = this.lockEliminate2Pair(rowList);
      if(resultHint) {
        hintList.push(...resultHint);
      }
    }
    return hintList.length > 0 ? hintList : null;
  }
  /**
   * # 셀의 3x3 블록에서 LockEliminate
   */
  hintLockEliminate2PairBox(): Hint[] | null {
    const hintList: Hint[] = [];
    for(let i = 0; i < 9; ++i) {
      const boxList = boxIndexList[i];
      const resultHint = this.lockEliminate2Pair(boxList);
      if(resultHint) {
        hintList.push(...resultHint);
      }
    }
    return hintList.length > 0 ? hintList : null;
  }
  hintLockEliminate3PairHorizontal() {
    
  }
  hintLockEliminate3PairVertical() {
  
  }
  hintLockEliminate3PairBox() {
  
  }
  hintHidden2PairHorizontal() {
  
  }
  hintHidden2PairVertical() {
  
  }
  hintHidden2PairBox() {
  
  }
  hintHidden3PairHorizontal() {
  
  }
  hintHidden3PairVertical() {
  
  }
  hintHidden3PairBox() {
  
  }
  hintPointingPair() {
  }
  /**
   * # x-wing 힌트
   * - 가로줄, 세로줄에서 같은 후보군이 있는 두 셀이 같은 가로줄, 세로줄에 있는 경우
   * - 같은 후보군을 가진 두 셀이 같은 가로줄, 세로줄에 있는 경우
   */
  hintXWing() {
    const hintList: Hint[] = [];
    /**
     * [
     *  [
     *    { digit: 1, indexList: [0, 5] },
     *    { digit: 2, indexList: [1, 6] },
     * ...
     *  ],
     *  [
     *    { digit: 1, indexList: [0, 5] },
     *    { digit: 2, indexList: [1, 6] },
     *  ]
     * ]
     */
    const colNumberIndexList = [

    ]
    for(let i = 0; i < 9; i++) {
      const colList = colIndexList[i];

    }
  }
  hintSwordFish() {
  }
  hintJellyFish() {
  }
  hintXYWing() {
  }
  hintXYZWing() {
  }
}


namespace Helper {
  export function extractCellDigit(cellList: Cell[]): number[] {
    return cellList.map((cell) => cell.digit);
  }
  /**
   * # 숫자 배열을 행렬로 변환
   * @param numberArray 대상 숫자 배열
   * @param row 행 수
   * @param col 열 수
   * @returns {number[][]}
   */
  export function numberArrayToMatrix(
    numberArray: number[], 
    row: number, 
    col: number)
    : number[][] {
    const matrix = [];
    for(let i = 0; i < row; i++) {
      matrix.push(numberArray.slice(i * col, i * col + col));
    }
    return matrix;
  }
  /**
   * # 행렬 곱셈
   * @param a 행렬
   * @param b 행렬
   * @param row 행 수
   * @param col 열 수
   * @returns {number[][]}
   */
  export function matrixMultiply(
    a: number[][], 
    b: number[][], 
    row: number, 
    col: number)
    : number[][] {
    const result: number[][] = [];
    for(let i = 0; i < row; i++) {
      result.push([]);
      for(let j = 0; j < col; j++) {
        let sum = 0;
        for(let k = 0; k < row; k++) {
          sum += a[i][k] * b[k][j];
        }
        result[i].push(sum);
      }
    }
    return result;
  }
  /**
   * # 배열 내용이 같은지 확인
   * @param a 
   * @param b 
   * @returns 
   */
  export function isArraysEqual(a: number[], b: number[]): boolean {
    return a.length === b.length && a.every((v, i) => v === b[i]);
  }
  /**
   * a 배열이 b 배열을 포함되는지 확인
   * @param a 
   * @param b 
   * @returns 
   */
  export function isArraysInclude(a: number[], b: number[]): boolean {
    return a.every((v) => b.includes(v));
  }
  /**
   * # 배열의 교집합 구하기
   * @param a
   */
  export function intersectionArray(a: number[], b: number[]): number[] {
    return a.filter((v) => b.includes(v));
  }
  /**
   * # 배열의 차집합 구하기
   * [1, 2] , [2, 3] => [1]
   * @param a 배열에서
   * @param b 배열을 미포함
   * @returns 
   */
  export function excludeArray(a: number[], b: number[]): number[] {
    return a.filter((v) => !b.includes(v));
  }
}











