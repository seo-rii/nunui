<script>
    import Ripple from "$lib/Ripple";
    import Button from "$lib/Button";
    import LinearProgress from "$lib/LinearProgress";
    import Icon from "$lib/Icon";
    import IconButton from "$lib/IconButton";
    import CircularProgress from "$lib/CircularProgress";
    import SegmentButton from "$lib/SegmentButton";
    import Card from "$lib/Card";
    import Checkbox from "$lib/Checkbox";
    import Radio from "$lib/Radio";
    import List from "$lib/List";
    import OneLine from "$lib/List/components/OneLine.svelte";
    import TwoLine from "$lib/List/components/TwoLine.svelte";
    import Paper from "$lib/Paper";
    import Table, {Th} from "$lib/Table";
    import Input from "$lib/Input";
    import Tooltip from "$lib/Tooltip";
    import Select, {Option} from "$lib/Select";

    let fl = false, m = 0, test = '1';
    const toggle = () => fl = !fl;
</script>


<h1>Ripple</h1>
<a href="/nunui"
   style="width: 400px;height:100px;position: relative;background: #eee;display: block;-webkit-tap-highlight-color: transparent;">
    <Ripple/>
</a>
<a href="/nunui"
   style="width: 400px;height:100px;position: relative;background: #eee;display: block;-webkit-tap-highlight-color: transparent;">
    <Ripple secondary/>
</a>

<h1>Button</h1>
<Button primary on:click={toggle}>
    <Icon icon="star" outlined={fl}/>
    Primary
</Button>
<Button secondary on:click={toggle}>
    <Icon icon="check_circle" outlined={fl}/>
    Secondary
</Button>
<Button outlined on:click={toggle}>
    <Icon icon="radio_button_checked" outlined={fl}/>
    Outlined
</Button>
<Button secondary outlined={fl} on:click={toggle}>
    <Icon icon="priority" outlined={fl}/>
    Outlined?
</Button>
<Button small>dfdfd</Button>
<Button primary round>dfdfd</Button>
<Button primary raised>dfdfd</Button>
<Button transparent>dfdfd</Button>
<Button primary disabled>dfdfd</Button>

<h1>Linear Progress</h1>
<LinearProgress progress={0.3}/>
<LinearProgress progress={0.5} secondary/>
<LinearProgress indeterminate={m===0} progress={0.5}/>

<h1>Circular Progress</h1>
<CircularProgress progress={fl?0.5:1}/>
<CircularProgress progress={0.3}/>
<CircularProgress indeterminate={m===0} progress={0.6}/>
<CircularProgress indeterminate secondary size="30"/>

<h1>Icon</h1>
<Icon icon="favorite"/>
<Icon icon="favorite" weight="200" size="36"/>

<h1>Icon Button</h1>
<IconButton icon="home" label="home" flat active={m===0} on:click={()=>m=0}/>
<IconButton icon="alarm" label="alarm button test" flat active={m===1} on:click={()=>m=1}/>

<IconButton icon="favorite" outlined={fl} on:click={toggle}/>
<IconButton icon="drive_folder_upload" size="48" outlined={fl} on:click={toggle} secondary/>
<IconButton icon="delete" size="48" outlined={fl} on:click={toggle} disabled/>

<h1>Segment Button</h1>
<SegmentButton data={['multiple', {text:1, icon:'alarm'}, 2, 3, 4]} multiple/>
<SegmentButton data={['single', {text:1, icon:'alarm'}, 2, 3, 4]}/>

<h1>Card</h1>
<Card>
    <h1>Card</h1>
    <p>Card</p>
    <Button primary style="float:right;">dfdfd</Button>
</Card>
<br>
<Card primary>
    <h1>Card</h1>
    <p>Card</p>
    <Button primary style="float:right;">dfdfd</Button>
</Card>
<br>
<Card outlined secondary>
    <h1>Card</h1>
    <p>Card</p>
    <Button secondary style="float:right;">dfdfd</Button>
</Card>
<br>
<Card outlined>
    <h1>Card</h1>
    <p>Card</p>
    <Button secondary outlined style="float:right;">dfdfd</Button>
</Card>
<br>

<h1>Checkbox</h1>
<Checkbox label="Primary"/>
<Checkbox label="Secondary" secondary/>
<Checkbox label="Error" error="Error Message"/>

<h1>Radio</h1>
<Radio label="R1 Primary" name="r1" value="1"/>
<Radio label="R1 Secondary" name="r1" value="2"/>
<Radio label="R2 Primary" name="r2" secondary/>
<Radio label="R2 Secondary" name="r2" secondary/>

<h1>List</h1>
<List>
    <OneLine title="OneLine" icon="star" iconHandler={() => console.log(1)}/>
    <OneLine title="OneLine" icon="star"/>
    <OneLine title="OneLine" icon="star"/>
    <OneLine title="OneLine" icon="star"/>
    <OneLine title="OneLine" icon="star"/>
    <TwoLine title="TwoLine" subtitle="subtitle" icon="favorite" iconHandler={() => console.log(2)}/>
    <TwoLine title="TwoLine" subtitle="subtitle" icon="favorite"/>
</List>

<h1>Paper</h1>
<Paper left top xstack icon="list" title="Menu">
    <Button slot="target">Open menu</Button>
    <List>
        <OneLine title="OneLine" icon="star"/>
        <OneLine title="OneLine" icon="star"/>
        <OneLine title="OneLine" icon="star"/>
        <OneLine title="OneLine" icon="star"/>
    </List>
</Paper>
<Paper left top xstack icon="list" title="Menu" mobile>
    <Button slot="target">Open mobile menu</Button>
    <List>
        <OneLine title="OneLine" icon="star"/>
        <OneLine title="OneLine" icon="star"/>
        <OneLine title="OneLine" icon="star"/>
        <OneLine title="OneLine" icon="star"/>
    </List>
</Paper>

<h1>Input</h1>
<Input placeholder="filled"/>
<Input placeholder="outlined" outlined/>
<Input placeholder="filled" helper="Helper"/>
<Input placeholder="filled" error="Error"/>

<h1>Table</h1>
<Table>
    <tr>
        <Th width="2">1</Th>
        <Th>2</Th>
    </tr>
    <tr>
        <td>1</td>
        <td>2</td>
    </tr>
    <tr>
        <td>1</td>
        <td>2</td>
    </tr>
    <tr>
        <td>1</td>
        <td>2</td>
    </tr>
</Table>
<Table fullWidth>
    <tr>
        <Th width="2">1</Th>
        <Th>2</Th>
    </tr>
    <tr>
        <td>1</td>
        <td>2</td>
    </tr>
    <tr>
        <td>1</td>
        <td>2</td>
    </tr>
    <tr>
        <td>1</td>
        <td>2</td>
    </tr>
</Table>
<Table minWidth="2000">
    <tr>
        {#each {length: 40} as _}
            <Th>12345</Th>
        {/each}
    </tr>
    <tr>
        {#each {length: 40} as _}
            <td>12345</td>
        {/each}
    </tr>
</Table>

<h1>Tooltip</h1>
<Tooltip left top xstack>
    <Button slot="target">Tooltip</Button>
    <div>Tooltip</div>
</Tooltip>

<h1>Tooltip</h1>
<Select placeholder="select" bind:selected={test}>
    <Option data="1" value="1" title="1"/>
    <Option data="2" value="2" title="2" subtitle="2"/>
    <Option data="3" value="3" title="3" icon="star"/>
</Select>
<br>
{test}
<br>
<Select placeholder="select" multiple>
    <Option data="1" value="1" title="1"/>
    <Option data="2" value="2" title="2" subtitle="2"/>
    <Option data="3" value="3" title="3" icon="star"/>
</Select>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
