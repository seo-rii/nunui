<script lang="ts">
    import {setContext} from "svelte";
    import {writable} from "svelte/store";

    export let minWidth = 600, style = '';
    const header = writable();
    setContext("header", header);
</script>

<main style:--minWidth="{minWidth}px" {style}>
    <div class="header" bind:this={$header}></div>
    <table>
        <slot/>
    </table>
</main>

<style lang="scss">
  @import "../Style";

  table {
    width: 100%;
    border-collapse: collapse;
    overflow: hidden;
    margin-bottom: 20px;
    table-layout: fixed;
    min-width: var(--minWidth);

    :global {
      th {
        border-bottom: 1px solid #c0cad0;
        padding: 10px;
        font-weight: 700;
        text-align: left;
      }


      td {
        padding: 10px;

        & > :global(*) {
          display: block;
          color: #000;
          text-decoration: none;

          & > :global(*) {
            display: block;
          }
        }
      }

      tr {
        &:not(:first-child) {
          transition: background 0.2s ease-in-out;

          &:hover {
            background-color: var(--primary-light3);
          }
        }

        &:nth-child(even) {
          background-color: var(--primary-light2);
        }
      }
    }
  }
</style>
