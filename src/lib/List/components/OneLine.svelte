<script lang="ts">
    import Base from "./Base.svelte";
    import Icon from "$lib/Icon/Icon.svelte";

    export let title, icon = '', round = false, active = false;
</script>

<Base {round} {active}>
    <main>
        <Icon {icon}/>
        <div>{title}</div>
    </main>
</Base>

<style lang="scss">
  main {
    margin: 0;
    display: flex;
    align-items: center;

    div {
      margin-left: 0.5rem;
    }
  }
</style>
