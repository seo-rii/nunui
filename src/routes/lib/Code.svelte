<script lang="ts">
    import CodeMirror, {EditorConfiguration} from "codemirror";
    import "codemirror/lib/codemirror.css";
    import "codemirror/mode/markdown/markdown";
    import "codemirror/mode/gfm/gfm";
    import "codemirror/mode/htmlmixed/htmlmixed";
    import {browser} from "$app/environment";

    import Codemirror from "codemirror-svelte";

    const editorOptions: EditorConfiguration = {
        mode: {
            name: "htmlmixed",
            highlightFormatting: true,
        },
        lineNumbers: false,
        readOnly: 'nocursor',
        theme: 'neo',
    };

    export let value = "";
</script>

{#if browser}
    {#key value}
        <main>
            <Codemirror {CodeMirror} {value} options={editorOptions}/>
        </main>
    {/key}
{/if}

<style lang="scss">
  main {
    padding: 12px;
    background: var(--primary-light1);
    border-radius: 12px;

    :global(.CodeMirror) {
      background: transparent;
    }
  }
</style>