<script lang="ts">
    import Button from "$lib/Button";
    import Icon from "$lib/Icon";
    import {createEventDispatcher} from "svelte";

    export let data = [], selected = null, check = true, nullable = true;
    export let selectable = true, multiple = false, small = false;

    const dispatch = createEventDispatcher();
</script>

<main on:auxclick on:click on:contextmenu on:dblclick on:mousedown on:mouseenter on:mouseleave on:mousemove on:mouseout
      on:mouseover on:mouseup on:wheel on:drag on:dragend on:dragenter on:dragleave on:dragover on:dragstart
      on:drop on:scroll>
    {#each data as item, i}
        {@const active = selected === i || selected?.includes?.(i)}
        <Button {small} className={item.icon ? '--custom' : ''} outlined {active} on:click={()=>{
            if (selectable) {
              if (multiple) {
                if(!selected) selected = [];
                if (active) selected.splice(selected.indexOf(i), 1);
                else selected.push(i);
              }
              else {
                if(active && nullable) selected = null;
                else selected = i;
              }
            }
            selected = selected;
            dispatch('select', selected);
          }}>
            {#if check}
                <span class="check" class:hide={!item.icon && !active}>
                  <Icon icon={item.icon || 'done'} outlined={item.icon && !active}/>
                </span>
            {/if}
            {item.text || item}
        </Button>
    {/each}
    <slot/>
</main>

<style lang="scss">
  @import "src/lib/Style";

  main {
    display: inline-block;

    .check {
      display: inline-block;
      overflow: hidden;
      vertical-align: bottom;
      transition: all 0.3s ease;
      width: 1em;
      margin: 0 -2px;

      &.hide {
        width: 0;
      }
    }

    & > :global(*) {
      padding-left: 0.8em !important;
      padding-right: 0.8em !important;
      border-radius: 0 !important;

      &:first-child {
        border-top-left-radius: 100px !important;
        border-bottom-left-radius: 100px !important;
      }

      &:last-child {
        border-top-right-radius: 100px !important;
        border-bottom-right-radius: 100px !important;
      }

      &:not(:first-child) {
        margin-left: -1px;
      }
    }

    & > :global(*.--active), & > :global(*.--custom) {
      padding-left: 0.3em !important;
      padding-right: 0.3em !important;
    }
  }
</style>
