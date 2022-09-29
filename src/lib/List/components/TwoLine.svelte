<script lang="ts">
    import Base from "./Base.svelte";
    import Icon from "$lib/Icon/Icon.svelte";

    export let title, subtitle, icon = '', round = false;
</script>

<Base {round}>
    <main>
        <Icon {icon}/>
        <div class="container">
            <div class="title">{title}</div>
            <div class="subtitle">{subtitle}</div>
        </div>
    </main>
</Base>

<style lang="scss">
  main {
    margin: 0;
    display: flex;
    align-items: center;

    .container {
      display: inline-block;
      margin-left: 0.5rem;

      .title {
        font-size: 1.3rem;
        font-weight: 500;
      }

      .subtitle {
        font-size: 1rem;
        font-weight: 400;
      }
    }
  }
</style>
