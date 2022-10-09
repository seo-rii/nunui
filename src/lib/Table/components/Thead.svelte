<script lang="ts">
    import Portal from "svelte-portal";
    import {getContext} from "svelte";

    const header = getContext("header");
</script>

<!--
<Portal target={$header}>
    <slot/>
</Portal>
-->
<th>
    <slot/>
</th>
