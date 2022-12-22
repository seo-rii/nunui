<script lang="ts">
    import {Button, Card, Radio, Checkbox} from "nunui";
    import Code from "../../lib/Code.svelte";

    let buttonType = null, buttonSize = null, buttonActive = false;
</script>

<h1>Button</h1>
<p>Simple button.</p>

<h2>Example</h2>
<Card outlined>
    <Button {...(buttonType || {})} {...(buttonSize || {})} actvie={buttonActive}>Button Test!</Button>
    <hr>
    <Code value="<Button{buttonType ? ' ' + Object.keys(buttonType).join(' ') : ''}{buttonSize ? ' ' + Object.keys(buttonSize).join(' ') : ''}{buttonActive ? ' active' : ''}>Button Test!</Button>"/>
    <hr>
    <p>Button Type</p>
    <Radio label="normal" bind:group={buttonType} value={null}/>
    <Radio label="outlined" bind:group={buttonType} value={{outlined: true}}/>
    <Radio label="transparent" bind:group={buttonType} value={{transparent: true}}/>

    <p>Button size</p>
    <Checkbox label="active" bind:checked={buttonActive}/>

    <p>Button Size</p>
    <Radio label="normal" bind:group={buttonSize} value={null}/>
    <Radio label="small" bind:group={buttonSize} value={{small: true}}/>
</Card>