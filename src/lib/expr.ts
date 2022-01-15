export type Expr = CellExpr;

interface CellId {
  row: number;
  col: number;
}

interface CellExpr {
  type: "cell";
  cell: CellId;
}

interface ExprParser {
  parseExpr(): Expr;
}

export function parseExpr(s: string): Expr {
  return makeExprParser(s).parseExpr();
}

export function makeExprParser(src: string): ExprParser {
  function parseExpr(): Expr {
    return parseCellExpr();
  }

  function parseCellExpr(): CellExpr {
    // single digit for now :)
    const col = src[0].charCodeAt(0) - "A".charCodeAt(0);
    const row = parseInt(src[1]) - 1;

    if (col < 0) throw new Error("col too small");
    if (row < 0) throw new Error("row too small");

    return {
      type: "cell",
      cell: {
        row,
        col,
      },
    };
  }

  return {
    parseExpr,
  };
}
