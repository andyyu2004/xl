<script lang="ts">
  import { Cell, CellData, evaluteExpr, Grid, parseExpr } from "./expr";
  function makeCell(value: string): CellData {
    return {
      value,
      display: value,
    };
  }
  const grid: Grid = {
    cells: [
      [makeCell("one"), makeCell("two")],
      [makeCell("three"), makeCell("four")],
      [makeCell("five"), makeCell("six")],
    ],
  };

  interface DepGraph {
    dependees: Map<number, Cell[]>;
  }

  /** pairing function so we can store cells in a map as a number (otherwise it uses ref equality) */
  function pair({ i, j }: Cell): number {
    return 0.5 * (i + j) * (i + j + 1) + j;
  }

  function makeDepGraph(grid: Grid): DepGraph {
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

  function recalculate(cell: Cell) {
    // TODO do an incremental update to the dependency graph
    const depGraph = makeDepGraph(grid);

    function recalculateInner(cell: Cell) {
      const { i, j } = cell;
      const data = grid.cells[i][j];
      const expr = parseExpr(data.value);
      const value = evaluteExpr(grid, expr);
      grid.cells[i][j].display = value;

      for (const dependee of depGraph.dependees.get(pair(cell)) || []) {
        recalculateInner(dependee);
      }
    }

    recalculateInner(cell);
  }

  function handleBlur(cell: Cell) {
    recalculate(cell);
  }

  let selected: Cell | undefined = undefined;
  function handleFocus(cell: Cell) {
    selected = cell;
  }
</script>

<main>
  <table>
    {#each ["", "A", "B", "C", "D", "E", "F"] as header}
      <th>{header}</th>
    {/each}
    {#each grid.cells as row, i}<td />
      <tr>
        <th>{i}</th>
        {#each row as col, j}
          {#if selected?.i === i && selected?.j === j}
            <td
              bind:textContent={col.value}
              on:focus={() => handleFocus({ i, j })}
              on:blur={() => handleBlur({ i, j })}
              contenteditable="true"
            >
              {col.value}
            </td>
          {:else}
            <td contenteditable="true" on:focus={() => handleFocus({ i, j })}>
              {col.display}
            </td>
          {/if}
        {/each}
      </tr>
    {/each}
  </table>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
</style>
