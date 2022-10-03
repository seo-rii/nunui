<script>
	export let delay = 0, hovering = false;
	let _hovering;

	function enter() {
		hovering = _hovering = true;
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
