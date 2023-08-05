<script lang="ts">
    import Base from "./Base.svelte";
    import Icon from "$lib/Icon/Icon.svelte";
    import {IconButton} from "nunui";

    export let title, icon = '', iconHandler = undefined, round = false, active = false;
</script>

<div class="adapter">
    {#if iconHandler}
        <div class="handler">
            <IconButton {icon} on:click={(e) => {
                e.stopPropagation();
                iconHandler(e);
            }} style="z-index: 1;" size="1.6rem"/>
        </div>
    {/if}
    <Base {round} {active} {...$$restProps}
          on:auxclick on:click on:contextmenu on:dblclick on:mousedown on:mouseenter on:mouseleave on:mousemove
          on:mouseout on:mouseover on:mouseup on:select on:wheel on:drag on:dragend on:dragenter on:dragleave
          on:dragover on:dragstart on:drop on:scroll on:focus on:blur>
        <main>
            {#if !iconHandler && icon}
                <Icon {icon}/>
            {:else if iconHandler}
                <span style="width: 1rem"></span>
            {/if}
            <div class="title">{title}</div>
            <slot/>
        </main>
    </Base>
</div>

<style lang="scss">
  .adapter {
    position: relative;

    .handler {
      position: absolute;
      top: 0;
      height: 100%;
      left: 8px;
      width: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  main {
    margin: 0;
    display: flex;
    align-items: center;

    .title {
      margin-left: 0.5rem;
    }
  }
</style>
