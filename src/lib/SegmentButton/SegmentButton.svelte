<script lang="ts">
  import Button from "$lib/Button";

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
      }}>{item}</Button>
  {/each}
  <slot />
</main>

<style lang="scss">
  @import "src/lib/Style";

  main {
    & > :global(*) {
      border-radius: 0 !important;

      &:first-child {
        border-radius: 12px 0 0 12px !important;
      }

      &:last-child {
        border-radius: 0 12px 12px 0 !important;
      }

      &:not(:first-child) {
        margin-left: -1px;
      }
    }
  }
</style>
