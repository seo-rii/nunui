<script lang="ts">
    import Base from "./Base.svelte";
    import Icon from "$lib/Icon/Icon.svelte";

    export let title, subtitle, icon = '', round = false, active = false;
</script>

<Base {round} {active}
      on:auxclick on:click on:contextmenu on:dblclick on:mousedown on:mouseenter on:mouseleave on:mousemove on:mouseout
      on:mouseover on:mouseup on:select on:wheel on:drag on:dragend on:dragenter on:dragleave on:dragover on:dragstart
      on:drop on:scroll>
    <main>
        <Icon {icon}/>
        <div class="container">
            <div class="title">{title}</div>
            <div class="subtitle">{subtitle}</div>
        </div>
        <slot/>
    </main>
</Base>

<style lang="scss">
  main {
    margin: 0;
    display: flex;
    align-items: center;

    .container {
      display: inline-block;
      margin-left: 0.5rem;

      .title {
        font-size: 1.3rem;
        font-weight: 500;
      }

      .subtitle {
        font-size: 1rem;
        font-weight: 400;
      }
    }
  }
</style>
