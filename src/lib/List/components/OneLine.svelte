<script lang="ts">
    import Base from "./Base.svelte";
    import Icon from "$lib/Icon/Icon.svelte";

    export let title, icon = '', round = false, active = false;
</script>

<Base {round} {active}
      on:auxclick on:click on:contextmenu on:dblclick on:mousedown on:mouseenter on:mouseleave on:mousemove on:mouseout
      on:mouseover on:mouseup on:select on:wheel on:drag on:dragend on:dragenter on:dragleave on:dragover on:dragstart
      on:drop on:scroll>
    <main>
        <Icon {icon}/>
        <div>{title}</div>
        <slot/>
    </main>
</Base>

<style lang="scss">
  main {
    margin: 0;
    display: flex;
    align-items: center;

    div {
      margin-left: 0.5rem;
    }
  }
</style>
