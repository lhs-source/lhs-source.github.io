

interface Cell {
  digit: number;  // 채워진 값. 0-9
  candidateList: number[];  // 후보 값. 0-9
  
  index: number;  // 0-80
  row: number;  // 0-8
  col: number;  // 0-8
}
interface Board {
  cells: Cell[];
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
]

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
          index,
          row: Math.floor(index / 9),
          col: index % 9
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
   * # 0 ~ 8 박스의 행렬을 차례대로 채운다.
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
   * # 후보군 랜덤 방식으로 숫자를 채운다.
   * - 랜덤으로 후보군을 선택한다.
   * @fail => 후보군이 아예 없어지는 케이스가 생긴다..
   */
  public generateOneCellCandidateRandom() {
    // 랜덤으로 후보군을 선택한다.
    const randomIndex = Math.floor(Math.random() * 81);
    // 해당 셀의 후보군 중 랜덤으로 선택한다.
    const cell = this.board.cells[randomIndex];
    const randomCandidateIndex = Math.floor(Math.random() * cell.candidateList.length);
    // 셀에 값을 채운다.
    const randomCandidate = cell.candidateList[randomCandidateIndex];
    this.setNumberCell(cell, randomCandidate);
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
    console.log('removeCandidate', row, col, block, digit);
    // 가로줄, 세로줄, 3x3 블록에 후보자를 제거
    for (let i = 0; i < 9; i++) {
      const cell = this.board.cells[row * 9 + i];
      this.removeCandidateCell(cell, digit);
      const cell2 = this.board.cells[i * 9 + col];
      this.removeCandidateCell(cell2, digit);
      const cell3 = this.board.cells[Math.floor(block / 3) * 27 + (block % 3) * 3 + Math.floor(i / 3) * 9 + i % 3];
      this.removeCandidateCell(cell3, digit);
      console.log('removeCandidate', row * 9 + i, i * 9 + col, Math.floor(block / 3) * 27 + (block % 3) * 3 + Math.floor(i / 3) * 9 + i % 3);
    }
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
    for (let i = 0; i < 9; i++) {
      const cell2 = this.board.cells[row * 9 + i];
      this.removeCandidateCell(cell, cell2.digit);
      const cell3 = this.board.cells[i * 9 + col];
      this.removeCandidateCell(cell, cell3.digit);
      const block = Math.floor(row / 3) * 3 + Math.floor(col / 3);
      const cell4 = this.board.cells[Math.floor(block / 3) * 27 + (block % 3) * 3 + Math.floor(i / 3) * 9 + i % 3];
      this.removeCandidateCell(cell, cell4.digit);
    }
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
   * # 숫자 기입
   * - 관련 후보군 제거
   * @param index 
   * @param digit 
   */
  setNumberIndex(index: number, digit: number) {
    const cell = this.board.cells[index];
    // 셀에 숫자 기입
    cell.digit = digit;
    this.removeCandidate(cell.row, cell.col, digit);
  }
  /**
   * # 숫자 기입
   * - 관련 후보군 제거
   * @param cell 
   * @param digit 
   */
  setNumberCell(cell: Cell, digit: number) {
    // 셀에 숫자 기입
    cell.digit = digit;
    this.removeCandidate(cell.row, cell.col, digit);
  }
}


namespace Helper {
  export function extractCellDigit(cellList: Cell[]): number[] {
    return cellList.map((cell) => cell.digit);
  }
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
}











