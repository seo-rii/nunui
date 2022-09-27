<script lang="ts">
  import Button from "$lib/Button";
  import Icon from "$lib/Icon";

  export let data = [], selected = null;

  export let selectable = true, multiple = false;
</script>

<main>
  {#each data as item, i}
    <Button outlined active={selected === i || selected?.includes?.(i)} on:click={()=>{
        if (selectable) {
          if (multiple) {
            if(!selected) selected = [];
            if (selected.includes(i)) selected.splice(selected.indexOf(i), 1);
            else selected.push(i);
          }
          else {
            if(selected === i) selected = null;
            else selected = i;
          }
        }
        selected = selected;
      }}>
      <span class="check" class:hide={selected !== i && !selected?.includes?.(i)}>
        <Icon icon={item.icon || 'done'} />
      </span>
      {item}
    </Button>
  {/each}
  <slot />
</main>

<style lang="scss">
  @import "src/lib/Style";

  main {
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
      padding-left: 0.7em !important;
      padding-right: 0.7em !important;
      border-radius: 0 !important;

      &:first-child {
        border-radius: 100px 0 0 100px !important;
      }

      &:last-child {
        border-radius: 0 100px 100px 0 !important;
      }

      &:not(:first-child) {
        margin-left: -1px;
      }
    }

    & > :global(*.--active) {
      padding-left: 0.2em !important;
      padding-right: 0.2em !important;
    }
  }
</style>
