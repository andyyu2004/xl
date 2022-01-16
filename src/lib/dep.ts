import { Cell, Grid, parseExpr } from "./expr";

export interface DepGraph<K extends number | string, V> {
  dependees: Map<K, V[]>;
}

/** pairing function so we can store cells in a map as a number (otherwise it uses ref equality) */
export function pair({ i, j }: Cell): number {
  return 0.5 * (i + j) * (i + j + 1) + j;
}

export function makeDepGraph(grid: Grid): DepGraph<number, Cell> {
  const dependees = new Map<number, Cell[]>();
  grid.cells.forEach((row, i) => {
    row.forEach((col, j) => {
      const expr = parseExpr(col.value);
      switch (expr.type) {
        case "cell":
          const cell = { i, j };
          const n = pair(expr.cell);
          if (!dependees.has(n)) dependees.set(n, []);
          dependees.get(n)!.push(cell);
        case "literal":
          break;
        default:
          const _: never = expr;
      }
    });
  });
  return { dependees };
}
