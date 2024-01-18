<script lang="ts">
    import Icon from "$lib/Icon";
    import Ripple from "$lib/Ripple";
    import Blocker from "$lib/Blocker";
    import Tooltip from "$lib/Tooltip";
    import forward from "$lib/Utility/forward";

    const ev = forward();

    export let icon: string = Object.keys($$restProps)[0], flat = false, size = '2em',
        outlined: any = undefined, disabled = false, active = false, label = "", secondary = false,
        primary = !secondary, tooltip = '';

    export let xstack, ystack, left, right, top, bottom;

    let clicked = false, hover = false, container;
</script>

{#if !tooltip}
    <div class="adapter">
        <div class="container" bind:this={container} style:--size={+size ? size + 'px' : size} use:ev>
            <div class="wrapper" {...$$restProps} class:flat>
                <div class="button" class:flat>
                    <Icon {icon} weight={disabled ? 300 : (clicked ? 200 : (hover ? 500 : 300))}
                          outlined={outlined === undefined ? !active : outlined}/>
                </div>
                <Ripple center bind:clicked bind:hover {active} opacity={disabled ? 0 : undefined} surface
                        additional={container} {primary} {secondary}/>
                <Blocker active={disabled}/>
            </div>
            {#if label}
                <div class="label">{label}</div>
            {/if}
        </div>
    </div>
{:else}
    <Tooltip {left} {right} {top} {bottom} {xstack} {ystack}>
        <div class="adapter">
            <div class="container" bind:this={container} style:--size={+size ? size + 'px' : size} use:ev>
                <div class="wrapper" {...$$restProps} class:flat>
                    <div class="button" class:flat>
                        <Icon {icon} weight={disabled ? 300 : (clicked ? 200 : (hover ? 500 : 300))}
                              outlined={outlined === undefined ? !active : outlined}/>
                    </div>
                    <Ripple center bind:clicked bind:hover {active} opacity={disabled ? 0 : undefined} surface
                            additional={container} {primary} {secondary}/>
                    <Blocker active={disabled}/>
                </div>
                {#if label}
                    <div class="label">{label}</div>
                {/if}
            </div>
        </div>
        {tooltip}
    </Tooltip>
{/if}

<style lang="scss">
  @import "src/lib/Style";

  .adapter {
    display: inline-block;

    .container {
      display: flex;
      flex-direction: column;
      cursor: pointer;

      .label {
        margin-top: 2px;
        font-size: calc(var(--size) * 0.4);
        text-align: center;
      }

      .wrapper {
        @include round(100px);
        display: inline-block;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        width: var(--size);
        height: var(--size);
        margin: auto;

        &.flat {
          width: calc(var(--size) * 1.25);
          height: calc(var(--size) * 0.75);
        }

        .button {
          width: var(--size);
          height: var(--size);
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
          transition: all 0.2s;

          & :global(*) {
            font-size: calc(var(--size) * 0.7);
            line-height: calc(var(--size) * 0.7);
          }

          &.flat {
            width: calc(var(--size) * 1.25);
            height: calc(var(--size) * 0.75);
          }
        }
      }
    }
  }
</style>
