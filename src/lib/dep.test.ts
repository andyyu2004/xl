import { makeDepGraph, pair } from "./dep";
import { Cell, makeCell } from "./grid";

test("test build simple dep graph", () => {
  const cells = [
    [makeCell("00"), makeCell("01")],
    [makeCell("10"), makeCell("=A0")],
  ];
  const dependees: Map<number, Cell[]> = new Map();
  dependees.set(pair({ i: 0, j: 0 }), [{ i: 1, j: 1 }]);
  expect(makeDepGraph({ cells })).toEqual({ dependees });
});
