export interface Grid {
  cells: CellData[][];
}

export interface CellData {
  value: string;
  display: string;
}

export interface Cell {
  /// row index
  i: number;
  /// col index
  j: number;
}

export function makeCell(value: string): CellData {
  return {
    value,
    display: value,
  };
}
