<script>
	export let delay = 0, openDelay = 0, hovering = false;
	let _hovering;

	function enter() {
		_hovering = true;
		setTimeout(() => {
			if (_hovering) hovering = true;
		}, openDelay);
	}

	function leave() {
		_hovering = false;
		setTimeout(() => {
			if (!_hovering) hovering = false;
		}, delay);
	}
</script>

<span on:mouseenter={enter} on:mouseleave={leave}>
	<slot {hovering}></slot>
</span>
