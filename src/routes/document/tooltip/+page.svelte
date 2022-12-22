<script lang="ts">
    import {Button, Tooltip, Card, Radio, Checkbox} from "nunui";
    import Code from "../../lib/Code.svelte";

    let tooltipX = null, tooltipY = null;
</script>

<h1>Tooltip</h1>
<p>Something pops out when hover.</p>

<h2>Example</h2>
<Card outlined>
    <main style="display: flex;align-items: center;justify-content: center;">
        <Tooltip {...(tooltipX || {left: true})} {...(tooltipY || {top: true})}>
            <Button slot='target'>Tooltip Test!</Button>
            <span>I am a tooltip</span>
        </Tooltip>
    </main>
    <hr>
    <Code value="<Tooltip{' ' + Object.keys(tooltipX || {left: true}).join(' ')}{' ' + Object.keys(tooltipY || {top: true}).join(' ')}>
    <Button slot='target'>Tooltip Test!</Button>
    <span>I am a tooltip</span>
</Tooltip>"/>
    <hr>
    <p>X position</p>
    <Radio label="left" bind:group={tooltipX} value={null}/>
    <Radio label="center" bind:group={tooltipX} value={{center: true}}/>
    <Radio label="right" bind:group={tooltipX} value={{right: true}}/>
    <p>Y position</p>
    <Radio label="top" bind:group={tooltipY} value={null}/>
    <Radio label="middle" bind:group={tooltipY} value={{middle: true}}/>
    <Radio label="bottom" bind:group={tooltipY} value={{bottom: true}}/>
</Card>