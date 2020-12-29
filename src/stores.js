import { writable } from 'svelte/store';

export { dungeon, tool };

const dungeon = writable({ rects: [{x: 25, y: 10, w: 5, h: 5}], doors: [] });
const tool = writable(0);
