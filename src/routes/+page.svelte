<script>
  import Ripple from "$lib/Ripple";
  import Button from "$lib/Button";
  import LinearProgress from "$lib/LinearProgress";
  import Icon from "$lib/Icon";
  import IconButton from "$lib/IconButton";
  import CircularProgress from "$lib/CircularProgress";
  import SegmentButton from "$lib/SegmentButton";

  let fl = false, m = 0;
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

<h1>Ripple</h1>
<a href="/"
   style="width: 400px;height:100px;position: relative;background: #eee;display: block;-webkit-tap-highlight-color: transparent;">
  <Ripple />
</a>
<a href="/"
   style="width: 400px;height:100px;position: relative;background: #eee;display: block;-webkit-tap-highlight-color: transparent;">
  <Ripple secondary />
</a>

<h1>Button</h1>
<Button primary on:click={toggle}>
  <Icon icon="star" outlined={fl} />
  Primary
</Button>
<Button secondary on:click={toggle}>
  <Icon icon="check_circle" outlined={fl} />
  Secondary
</Button>
<Button outlined on:click={toggle}>
  <Icon icon="radio_button_checked" outlined={fl} />
  Outlined
</Button>
<Button secondary outlined={fl} on:click={toggle}>
  <Icon icon="priority" outlined={fl} />
  Outlined?
</Button>
<Button small>dfdfd</Button>
<Button primary round>dfdfd</Button>
<Button primary raised>dfdfd</Button>
<Button primary disabled>dfdfd</Button>

<h1>Linear Progress</h1>
<LinearProgress progress={0.3} />
<LinearProgress progress={0.5} secondary />
<LinearProgress indeterminate={m===0} progress={0.5} />

<h1>Circular Progress</h1>
<CircularProgress progress={fl?0.5:1} />
<CircularProgress progress={0.3} />
<CircularProgress indeterminate={m===0} progress={0.6} />
<CircularProgress indeterminate secondary size="30" />

<h1>Icon</h1>
<Icon icon="favorite" />
<Icon icon="favorite" weight="200" size="36" />

<h1>Icon Button</h1>
<IconButton icon="home" label="home" flat active={m===0} on:click={()=>m=0} />
<IconButton icon="alarm" label="alarm" flat active={m===1} on:click={()=>m=1} />

<IconButton icon="favorite" outlined={fl} on:click={toggle} />
<IconButton icon="drive_folder_upload" size="48" outlined={fl} on:click={toggle} secondary />
<IconButton icon="delete" size="48" outlined={fl} on:click={toggle} disabled />

<h1>Segment Button</h1>
<SegmentButton data={['multiple', 1, 2, 3, 4]} multiple />
<SegmentButton data={['single', 1, 2, 3, 4]} />
