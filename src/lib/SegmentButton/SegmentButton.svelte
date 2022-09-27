<script lang="ts">
  import Button from "$lib/Button";

  export let data = ["a", "b", "c", "d"];
</script>

<main>
  {#each data as item, i}
    <Button outlined>{item}</Button>
  {/each}
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
