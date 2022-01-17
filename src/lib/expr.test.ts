import { makeCellExpr, makeExprParser } from "./expr";

test("parse cell expr", () => {
  expect(makeExprParser("=A1").parseExpr()).toEqual(
    makeCellExpr({ i: 1, j: 0 })
  );
});
