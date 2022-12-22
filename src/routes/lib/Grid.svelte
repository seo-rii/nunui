<script lang='ts'>
	export let width = 120, max = Infinity;
	let clientWidth = 0, template = '';
	$: template = '1fr '.repeat(Math.max(Math.min(Math.floor(clientWidth / width), max), 1));
</script>

<style lang='scss'>
  main {
    display: grid;
		position: relative;
    margin: 0 -5px;

    & > :global(*:not(iframe)) {
      margin: 0 5px;
    }
  }
</style>

<main bind:clientWidth style={`grid-template-columns: ${template};`}>
	<slot />
</main>
