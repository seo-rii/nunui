<script lang="ts">
    import {Card, Button} from "nunui";
    import Code from "./lib/Code.svelte";
    import Grid from "./lib/Grid.svelte";
</script>

<h1>nunui</h1>
<p>Material 3 components for svelte</p>

<h2>Install</h2>
<Code value="npm i nunui"/>

<h2>Documentation</h2>
<Grid max="4">
    <Card>
        <h2 style="margin: 0 0 10px 0;">Button</h2>
        <a href="/document/button" style="float: right;"><Button small transparent>document</Button></a>
    </Card>
    <Card>
        <h2 style="margin: 0 0 10px 0;">Tooltip</h2>
        <a href="/document/tooltip" style="float: right;"><Button small transparent>document</Button></a>
    </Card>
</Grid>