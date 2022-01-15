import { makeExprParser } from "./expr";

test("parse cell expr", () => {
  expect(makeExprParser("A1").parseExpr()).toEqual({
    type: "cell",
    cell: { row: 0, col: 0 },
  });
});
