import { makeCellExpr, makeExprParser } from "./expr";

test("parse cell expr", () => {
  expect(makeExprParser("A1").parseExpr()).toEqual(
    makeCellExpr({ i: 0, j: 0 })
  );
});
