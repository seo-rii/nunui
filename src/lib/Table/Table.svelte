<script lang="ts">
    import {setContext} from "svelte";
    import {writable} from "svelte/store";

    export let minWidth = 600, style = '';
    const header = writable(), col = writable([]);
    setContext("header", header);
    setContext("col", col);
</script>

<main style:--minWidth="{minWidth}px" {style}
      on:auxclick on:click on:contextmenu on:dblclick on:mousedown on:mouseenter on:mouseleave on:mousemove on:mouseout
      on:mouseover on:mouseup on:select on:wheel on:drag on:dragend on:dragenter on:dragleave on:dragover on:dragstart
      on:drop on:scroll>
    <div class="header" bind:this={$header}></div>
    <table>
        <colgroup>
            {#each $col as item}
                <col style='width:{(item * 100) / $col.reduce((a, b) => a + b, 0)}%;'/>
            {/each}
        </colgroup>
        <slot/>
    </table>
</main>

<style lang="scss">
  @import "../Style";

  main {
    width: 100%;
    overflow-x: scroll;
  }

  table {
    border-collapse: collapse;
    margin-bottom: 20px;
    table-layout: fixed;
    min-width: var(--minWidth);
    width: 100%;

    :global {
      th {
        padding: 10px;
        font-weight: 600;
        text-align: left;
        position: relative;

        &:after {
          position: absolute;
          content: '';
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          border-bottom: 1px solid var(--primary-light3);
        }

        &:first-child:after {
          left: 12px;
        }

        &:last-child:after {
          right: 12px;
        }
      }

      tr {
        &:not(:nth-child(2)) {
          transition: background 0.2s ease-in-out;

          &:hover {
            background-color: var(--primary-light2);
          }
        }

        &:nth-child(even) {
          background-color: var(--primary-light1);
        }

        &:nth-child(2) {
          background-color: unset;
        }
      }

      td {
        padding: 10px;

        &:first-child {
          border-radius: 12px 0 0 12px;
        }

        &:last-child {
          border-radius: 0 12px 12px 0;
        }

        & > :global(*) {
          display: block;
          color: #000;
          text-decoration: none;

          & > :global(*) {
            display: block;
          }
        }
      }
    }
  }
</style>
