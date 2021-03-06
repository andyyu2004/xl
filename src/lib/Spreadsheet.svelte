<script lang="ts">
  import type { Cell, Grid } from "./grid";
  import { makeCell } from "./grid";
  import { evaluteExpr, parseExpr } from "./expr";
  import { makeDepGraph, pair } from "./dep";

  const grid: Grid = {
    cells: [
      [makeCell("one"), makeCell("two")],
      [makeCell("three"), makeCell("four")],
      [makeCell("five"), makeCell("six")],
    ],
  };

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
