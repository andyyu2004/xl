<script lang="ts">
  interface Grid {
    cells: Cell[][];
  }

  interface Cell {
    content: Content;
  }

  type Content = string | number;
  const grid: Grid = {
    cells: [
      [{ content: "one" }, { content: "two" }],
      [{ content: "three" }, { content: "four" }],
      [{ content: "five" }, { content: "six" }],
    ],
  };
</script>

<main>
  <table>
    {#each ["", "a", "b", "c", "d", "e", "f"] as header}
      <th>{header}</th>
    {/each}
    {#each grid.cells as row, i}<td />
      <tr>
        <th>{i}</th>
        {#each row as col}
          <td>{col.content}</td>
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
