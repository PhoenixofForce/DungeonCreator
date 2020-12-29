<script>
  import { dungeon } from './stores.js';
  import { mouse } from './visuals/mouse.js'
  import { tileSize, cam, pixelRatio } from './visuals/game.js';

  import ToolBar from './ToolBar.svelte';

  import Canvas from './visuals/Canvas.svelte';
  import Grid from './visuals/Grid.svelte';
  import Background from './visuals/Background.svelte';
  import Room from './visuals/Room.svelte';
  import Hover from './visuals/Hover.svelte';
  import Door from './visuals/Door.svelte';
  import DragPreview from './visuals/DragPreview.svelte';

  let hover = {x: 0, y: 0, w: 1, h: 1};

	function mousemove(ev) {
		let mousePos = {x: $mouse.tileX, y: $mouse.tileY}
		hover = $dungeon.rects.find(room => mousePos.x >= room.x && mousePos.x < room.x + room.w && mousePos.y >= room.y && mousePos.y <= room.y + room.h);

    if(!hover) {
      hover = {x: Math.floor(mousePos.x), y: Math.floor(mousePos.y), w: 1, h: 1};
    }
  }
</script>

<ToolBar />
<div id="canvasDisplay" on:mousemove={mousemove}>
  <Canvas>
    <Background>
    </Background>

    {#each $dungeon.rects as room}
      <Room dimension={room} />
    {/each}

    {#each $dungeon.doors as room}
      <Door bind:dimension={room} />
    {/each}

    <Grid />
    {#if $mouse.entered}
      <Hover bind:dimension={hover} />
    {/if}

    <DragPreview />
  </Canvas>
</div>

<style>
#canvasDisplay {
  position: fixed;
  overflow-y: hidden;
	box-sizing: border-box;
}
</style>
