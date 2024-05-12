<script lang="ts" context="module">
    let pr;
</script>

<script lang="ts">
    import {Input, Paper} from "$lib";
    import {browser} from "$app/environment";
    import {onMount} from "svelte";

    export let value, min, max;
    let display = '', _display = '';

    $: {
        if (!value) _display = '';
        else if (value instanceof Date) _display = value.toLocaleDateString();
        else if (typeof value === 'string') _display = value;
        else _display = '';
    }
    $: if (display !== _display) display = _display;

    let DatePicker, ko;
    if (browser) onMount(() => {
        if (pr) pr.then(m => ([DatePicker, ko] = m))
        else pr = Promise.all([
            import('date-picker-svelte'),
            import('date-fns/locale')
        ]).then(([m1, m2]) => ([DatePicker, ko] = [m1.DatePicker, m2.ko]))
    })
</script>

<Paper left bottom xstack>
    <Input bind:value={display} {...$$restProps} slot="target"/>
    <main>
        {#if DatePicker && ko}
            <DatePicker locale={ko} {min} {max} bind:value/>
        {/if}
    </main>
</Paper>

<style lang="scss">
  main {
    --date-picker-foreground: var(--on-surface);
    --date-picker-background: transparent;
    --date-picker-highlight-border: var(--primary);
    --date-picker-selected-color: #000;
    --date-picker-selected-background: var(--primary-light2);

    :global(.date-time-picker) {
      box-shadow: none !important;
      border: none !important;
    }
  }
</style>