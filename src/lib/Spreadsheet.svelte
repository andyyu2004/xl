<script lang="ts">
  interface Grid {
    cells: Cell[][];
  }

  interface Cell {
    content: string;
  }

  type Content = string | number;
  const grid: Grid = {
    cells: [
      [{ content: "one" }, { content: "two" }],
      [{ content: "three" }, { content: "four" }],
      [{ content: "five" }, { content: "six" }],
    ],
  };

  function handleBlur(i: number, j: number) {
    console.log(i, j, grid.cells[i][j].content);
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
          <td
            bind:textContent={col.content}
            contenteditable="true"
            on:blur={() => handleBlur(i, j)}
          >
            {col.content}
          </td>
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
