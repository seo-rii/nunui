<script>
  import Ripple from "$lib/Ripple";
  import Button from "$lib/Button";
  import LinearProgress from "$lib/LinearProgress";
  import Icon from "$lib/Icon";
  import IconButton from "$lib/IconButton";

  let fl = false;
  const toggle = () => fl = !fl;
</script>

<style lang="scss">
  :global {
    @import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css);

    body, html, body > div {
      margin: 0;
      padding: 0;
      font-family: 'Spoqa Han Sans Neo', 'sans-serif';
      height: 100%;
    }
  }
</style>


<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>


<a href="/"
   style="width: 400px;height:100px;position: relative;background: #eee;display: block;-webkit-tap-highlight-color: transparent;">
  <Ripple />
</a>
<a href="/"
   style="width: 400px;height:100px;position: relative;background: #eee;display: block;-webkit-tap-highlight-color: transparent;">
  <Ripple secondary />
</a>

<Button primary on:click={toggle}>
  <Icon icon="star" outlined={fl} />
  Primary
</Button>
<Button secondary>Secondary</Button>
<Button outlined>dfdfd</Button>
<Button small>dfdfd</Button>
<Button primary raised>dfdfd</Button>
<Button primary disabled>dfdfd</Button>

<LinearProgress progress={0.3} />
<LinearProgress progress={0.5} secondary />
<LinearProgress indeterminate />

<Icon icon="favorite" />
<Icon icon="favorite" weight="200" size="36" />

<IconButton icon="favorite" outlined={fl} on:click={toggle} />
<IconButton icon="drive_folder_upload" size="48" outlined={fl} on:click={toggle} />
<IconButton icon="drive_folder_upload" size="48" outlined={fl} on:click={toggle} disabled />
