export type Expr = CellExpr | LiteralExpr;

export interface Grid {
  cells: CellData[][];
}

export interface CellData {
  value: string;
  display: string;
}

interface ExprBase {}

export interface Cell {
  /// row index
  i: number;
  /// col index
  j: number;
}

export function evaluteExpr(grid: Grid, expr: Expr): string {
  switch (expr.type) {
    case "cell":
      const { i, j } = expr.cell;
      return grid.cells[i][j].display;
    case "literal":
      return expr.literal;
    default:
      // asserts expr must be never and hence switch is exhaustive
      return expr;
  }
}

interface CellExpr extends ExprBase {
  type: "cell";
  cell: Cell;
}

interface LiteralExpr extends ExprBase {
  type: "literal";
  literal: string;
}

interface ExprParser {
  parseExpr(): Expr;
}

export function parseExpr(s: string): Expr {
  return makeExprParser(s).parseExpr();
}

export function makeExprParser(src: string): ExprParser {
  function parseExpr(): Expr {
    if (src[0] === "=" && src.length > 1) {
      src = src.slice(1);
      return parseCellExpr();
    }
    return makeLiteralExpr(src);
  }

  function parseCellExpr(): CellExpr {
    // single digit for now :)
    const j = src[0].toUpperCase().charCodeAt(0) - "A".charCodeAt(0);
    const i = parseInt(src[1]);

    if (i < 0) throw new Error(`row ${i} too small`);
    if (j < 0) throw new Error(`col ${j} too small`);

    return makeCellExpr({ i, j });
  }

  return {
    parseExpr,
  };
}

export function makeLiteralExpr(literal: string): LiteralExpr {
  return {
    type: "literal",
    literal,
  };
}

export function makeCellExpr(cell: Cell): CellExpr {
  return {
    type: "cell",
    cell,
  };
}
