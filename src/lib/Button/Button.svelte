<script lang="ts">
    import Ripple from "$lib/Ripple";
    import Blocker from "$lib/Blocker";
    import Icon from "$lib/Icon";
    import Tooltip from "$lib/Tooltip";
    import forward from "$lib/Utility/forward";

    const ev = forward();

    export let secondary = false, error = false, primary = !secondary && !error,
        small = false, round = false, outlined = false, raised = false, transparent = false,
        tabindex = undefined, disabled = false, active = false,
        className = "", color = '', tooltip = '', icon = '', style = "";

    export let xstack, ystack, left, right, top, bottom;

    let clicked = false, hover = false;
    $: _raised = raised || (hover && !clicked && !outlined && !transparent && !disabled);
</script>

{#if !tooltip}
    <div class="wrapper button {className}" class:primary class:secondary class:error {tabindex} class:small class:round
         class:transparent class:--active={active} class:active={(hover && !disabled) || active}
         class:clicked={clicked && !disabled} class:outlined class:raised={_raised} {style} on:keypress={(e)=>{
			if (e.key==='Enter') e.target.click();
		 }} use:ev|self style:background={color}>
        <div style:--weight={!disabled && (clicked ? 200 : (hover && 500)) || undefined}>
            {#if icon}
                <Icon {icon} style="margin-right: 4px"/>
            {/if}
            <slot/>
        </div>
        <Ripple {primary} {secondary} {active} {error} surface={outlined || transparent}
                opacity={disabled ? 0 : undefined} bind:clicked bind:hover/>
        {#if disabled}
            <Blocker active/>
        {/if}
    </div>
{:else}
    <Tooltip {left} {right} {top} {bottom} {xstack} {ystack}>
        <div class="wrapper button {className}" class:primary class:secondary {tabindex} class:small class:round
             class:transparent class:--active={active} class:active={(hover && !disabled) || active}
             class:clicked={clicked && !disabled} class:outlined class:raised={_raised} {style} on:keypress={(e)=>{
			if (e.key==='Enter') e.target.click();
		 }} use:ev|self style:background={color} slot="target">
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
