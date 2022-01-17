import type { DepGraph } from "./dep";

test("parse cell expr", () => {
  const g: DepGraph<number, string> = {
    dependees: new Map(),
  };
  const cells = [[{ value: "=A1" }]];
  // expect(makeDepGraph({ cells })).toEqual(g);
});
