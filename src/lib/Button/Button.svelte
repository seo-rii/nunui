<script lang="ts">
    import Ripple from "$lib/Ripple";
    import Blocker from "$lib/Blocker";
    import Icon from "$lib/Icon";
    import Tooltip from "$lib/Tooltip";

    export let style = "", secondary = false, primary = !secondary, small = false, round = false, outlined = false,
        raised = false, tabindex = undefined, disabled = false, active = false, className = "", color = '',
        transparent = false, tooltip = '', icon = '';

    export let xstack, ystack, left, right, top, bottom;

    let clicked = false, hover = false;
    $: _raised = raised || (hover && !clicked && !outlined && !transparent && !disabled);
</script>

{#if !tooltip}
    <div class="wrapper button {className}" class:primary class:secondary {tabindex} class:small class:round
         class:transparent class:--active={active} class:active={(hover && !disabled) || active}
         class:clicked={clicked && !disabled} class:outlined class:raised={_raised} {style} on:keypress={(e)=>{
			if (e.key==='Enter') e.target.click();
		 }}
         on:auxclick on:click on:contextmenu on:dblclick on:mousedown on:mouseenter on:mouseleave on:mousemove
         on:mouseout
         on:mouseover on:mouseup on:select on:wheel on:drag on:dragend on:dragenter on:dragleave on:dragover
         on:dragstart
         on:drop on:scroll style:background={color}>
        <div style:--weight={!disabled && (clicked ? 200 : (hover && 500)) || undefined}>
            {#if icon}
                <Icon {icon} style="margin-right: 4px"/>
            {/if}
            <slot/>
        </div>
        <Ripple {primary} {secondary} {active} surface={outlined || transparent} opacity={disabled ? 0 : undefined}
                bind:clicked
                bind:hover/>
        {#if disabled}
            <Blocker active/>
        {/if}
    </div>
{:else}
    <Tooltip {left} {right} {top} {bottom} {xstack} {ystack}>
        <svelte:self {...$$props} tooltip={undefined} slot="target">
            <slot/>
        </svelte:self>
        {tooltip}
    </Tooltip>
{/if}

<style lang="scss">
  @import "src/lib/Style";

  .wrapper {
    @include round;
    display: inline-block;
    position: relative;
    padding: 0.6em;
    font-size: 1.1em;
    line-height: 1.1em;
    cursor: pointer;
    user-select: none;
    transition: all 0.3s ease;

    &.active {
      @include round(large);
    }

    &.clicked {
      @include round(20px);
    }

    &.small {
      font-size: 16px;
      line-height: 16px;
      padding: 0.4em;
      @include round(small);

      &.active {
        @include round;
      }

      &.clicked {
        @include round(large);
      }
    }

    &.round {
      @include round(100px);
    }

    &.outlined {
      padding: calc(0.6em - 1px);

      &.small {
        padding: calc(0.4em - 1px);
      }

      @include applyTheme(color);
      @include applyTheme(border, 1px solid, '', 4);
    }

    &:not(.outlined):not(.transparent) {
      @include applyTheme(background);
      @include applyThemeOn(color);
    }

    &.transparent {
      background: transparent;
      color: var(--on-surface);
    }

    &.raised {
      @include shadow("common", "mini");

      &.primary {
        @include shadow("primary", "mini");
      }

      &.secondary {
        @include shadow("secondary", "mini");
      }
    }
  }
</style>
