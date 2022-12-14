<script lang='ts'>
    import Hoverable from '$lib/Hoverable';
    import Paper from '$lib/Paper';

    export let left = false, center = false, right = false, top = false, middle = false, bottom = false,
        unbounded = false, absolutex = false, absolutey = false, tooltip = true, exOpen = false, hover = false;
    export let xstack = false, ystack = false;
    export let stacked = 0;
    export let style = '', title = '';
    export let fullWidth = false;
    export let __remap = false;
    export let width = 'fit-content;';
    export let padding = 5;
    export let mobileSupport = false, mobile = false;
    export let delay = 200, openDelay = 0;
    export let ignoreTarget = false;

    export let hovering = false, open = (!mobile && hovering) || exOpen;
    let hoveringTarget = false, hoveringTooltip = false;

    $: hovering = hoveringTarget || hoveringTooltip;
    $: open = (!mobile && hovering) || exOpen;
</script>

<style lang='scss'>
  span {
    display: inline-block;

    & :global(*) {
      white-space: nowrap;
    }

    &.fullWidth {
      width: 100%;
      display: inline-block;
      position: relative;
    }
  }
</style>

{#if !mobile || mobileSupport}
<span class:fullWidth>
		<Paper {left} {center} {right} {top} {middle} {bottom} {unbounded} {absolutex} {absolutey} {tooltip}
               exOpen={(!mobile && hovering) || exOpen} hover={!mobile} {xstack} {ystack} {stacked} {style} {title}
               {fullWidth} {__remap} {width} {padding} let:hide>
			<Hoverable bind:hovering={hoveringTarget} {delay} {openDelay} slot='target'>
					<slot name='target' {hide}/>
			</Hoverable>
            {#if ignoreTarget}
				<slot {hide} {open}/>
			{:else}
				<Hoverable bind:hovering={hoveringTooltip} {delay} {openDelay}>
					<slot {hide} {open}/>
				</Hoverable>
			{/if}
		</Paper>
</span>
{:else}
    <slot name='target'/>
{/if}
