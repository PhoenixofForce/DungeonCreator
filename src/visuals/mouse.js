import { writable } from 'svelte/store';

let mouse = writable({
  screenX: 0,
  screenY: 0,
  worldX: 0,
  worldY: 0,
  tileX: 0,
  tileY: 0,
  clickTileX: 0,
  clickTileY: 0,
  entered: true,
  down: 0
});

export { mouse, }
