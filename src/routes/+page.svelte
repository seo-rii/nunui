<script>
  import Ripple from "$lib/Ripple";
  import Button from "$lib/Button";
  import LinearProgress from "$lib/LinearProgress";
</script>

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

<Button primary>dfdfd</Button>
<Button secondary>dfdfd</Button>
<Button outlined>dfdfd</Button>
<Button small>dfdfd</Button>
<Button primary raised>dfdfd</Button>
<Button primary disabled>dfdfd</Button>
<LinearProgress progress={0.3} />
<LinearProgress progress={0.5} secondary />
<LinearProgress indeterminate />
