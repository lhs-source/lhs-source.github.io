import { createSudokuInstance } from "./sudoku2";
import {
  type AnalyzeData,
  type Board,
  type Difficulty,
  type SolvingStep,
  type SolvingResult,
  InternalBoard,
} from "./sudoku2types";

export { type AnalyzeData, type Board, type Difficulty, type SolvingStep };

export function analyze(Board: Board): AnalyzeData {
  const { analyzeBoard } = createSudokuInstance({
    initBoard: Board,
  });
  return analyzeBoard();
}

export function generate(difficulty: Difficulty): Board {
  const { getBoard } = createSudokuInstance({ difficulty });
  return getBoard();
}
export function candidateAll(board: Board): InternalBoard {
  const { getInternalBoard } = createSudokuInstance({ initBoard: board});
  return getInternalBoard();
}
export function generateWithCandidate(difficulty: Difficulty): InternalBoard {
  const { getInternalBoard } = createSudokuInstance({ difficulty });
  return getInternalBoard();
}

export function solve(Board: Board): SolvingResult {
  const solvingSteps: SolvingStep[] = [];

  const { solveAll, analyzeBoard } = createSudokuInstance({
    initBoard: Board,
    onUpdate: (solvingStep) => solvingSteps.push(solvingStep),
  });

  const analysis = analyzeBoard();

  if (!analysis.hasSolution) {
    return { solved: false, error: "No solution for provided board!" };
  }

  const board = solveAll();

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

export function hint2(Board: Board): SolvingResult {
  const solvingSteps: SolvingStep[] = [];
  const { solveStep, analyzeBoard } = createSudokuInstance({
    initBoard: Board,
    onUpdate: (solvingStep) => solvingSteps.push(solvingStep),
  });
  const analysis = analyzeBoard();

  if (!analysis.hasSolution) {
    return { solved: false, error: "No solution for provided board!" };
  }
  const board = solveStep();

  if (!board) {
    return { solved: false, error: "No solution for provided board!" };
  }

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

// export function candidates(Board: Board): Board {
//   const { getRemainingCandidates } = createSudokuInstance({ initBoard: Board });
//   return getRemainingCandidates();
// }