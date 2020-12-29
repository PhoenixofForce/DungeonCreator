<script>
  import { tool, dungeon } from './stores.js';
  import { importDungeon, exportDungeon } from './util.js';

  let files;
  $: {
      if (files && files[0]) {
          let binfile = files[0];
          importDungeon(binfile);
      }
  }

  function setTool(id) {
    $tool = id;
  }

  function clickDownload() {
    exportDungeon($dungeon);
  }

  function clickUpload() {
    document.getElementById('fileid').click();
  }
</script>

<div id="toolbar" class="is-full-width">

  <button class="button icon-only" class:success={$tool == 0} on:click={() => setTool(0)} >
    <img alt="move" src="https://icongr.am/feather/move.svg?size=24">
  </button>

  <button class="button icon-only" class:success={$tool == 1} on:click={() => setTool(1)}>
    <img alt="edit" src="https://icongr.am/feather/edit-2.svg?size=24">
  </button>

  <button class="button icon-only" class:success={$tool == 2} on:click={() => setTool(2)}>
    <img alt="delete" src="https://icongr.am/feather/delete.svg?size=24">
  </button>

  <button class="button icon-only right" on:click={clickUpload}>
    <img alt="upload file" src="https://icongr.am/feather/upload.svg?size=24">
  </button>

  <button class="button icon-only primary" on:click={clickDownload}>
    <img alt="download" src="https://icongr.am/feather/download.svg?size=24">
  </button>
</div>

<input id='fileid' type='file' class="is-hidden" bind:files />

<style>
  #toolbar {
    position: fixed;
    display: flex;
    margin-top: 8px;
    margin-bottom: 8px;
    padding-right: 8px;
    z-index: 5;
  }

  .right {
    margin-left: auto;
  }

  button {
    margin-left: 8px;
  }
</style>
