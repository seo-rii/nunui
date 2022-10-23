<script lang="ts">
    import {setContext} from "svelte";
    import {writable} from "svelte/store";

    export let minWidth = 600, style = '';
    const header = writable();
    setContext("header", header);
</script>

<main style:--minWidth="{minWidth}px" {style}
      on:auxclick on:click on:contextmenu on:dblclick on:mousedown on:mouseenter on:mouseleave on:mousemove on:mouseout
      on:mouseover on:mouseup on:select on:wheel on:drag on:dragend on:dragenter on:dragleave on:dragover on:dragstart
      on:drop on:scroll>
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
