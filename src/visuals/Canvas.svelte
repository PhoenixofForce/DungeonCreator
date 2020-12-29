<script>
	import { onMount, onDestroy, setContext } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import { mouse } from './mouse.js'
	import { dungeon, tool } from '../stores.js'
	import { key, width, height, canvas as canvasStore, context as contextStore, 	pixelRatio, props, time, tileSize, cam, } from './game.js';

	export let killLoopOnError = true;
	export let attributes = {};

	let clickStart;
	let listeners = [];
	let canvas;
	let context;
	let frame;

	onMount(() => {
		// prepare canvas stores
		context = canvas.getContext('2d', attributes);
		canvasStore.set(canvas);
		contextStore.set(context);

		// start game loop
		return createLoop((elapsed, dt) => {
			time.set(elapsed);
			render(dt);
		});
	});

	setContext(key, {
		add (fn) {
			this.remove(fn);
			listeners.push(fn);

			if (fn.setup) {
				let p = fn.setup($props);
				if (p && p.then) p;
			}
			fn.ready = true;

			listeners.sort((e1, e2) => e1.height - e2.height);
		},
		remove (fn) {
			const idx = listeners.indexOf(fn);
			if (idx >= 0) listeners.splice(idx, 1);
		}
	});

	function render (dt) {
		context.save();

		context.translate(-$cam.dx, -$cam.dy);
		context.scale($pixelRatio, $pixelRatio);
		listeners.forEach(entity => {
			try {
				if (entity.mounted && entity.ready && entity.render) {
					entity.render($props, dt);
				}
			} catch (err) {
				console.error(err);
				if (killLoopOnError) {
					cancelAnimationFrame(frame);
					console.warn('Animation loop stopped due to an error');
				}
			}
		});
		context.restore();
	}

	function handleResize () {
		width.set(window.innerWidth);
		height.set(window.innerHeight);
		pixelRatio.set(window.devicePixelRatio);
	}

	function createLoop (fn) {
		let elapsed = 0;
		let lastTime = performance.now();
		(function loop() {
			frame = requestAnimationFrame(loop);
			const beginTime = performance.now();
			const dt = (beginTime - lastTime) / 1000;
			lastTime = beginTime;
			elapsed += dt;
			fn(elapsed, dt);
		})();
		return () => {
			cancelAnimationFrame(frame);
		};
	}

	const dispatch = createEventDispatcher();
	function handleMouseUp(ev) {
		$mouse.down = false;

		let timeDis = Date.now() - clickStart;
		let data = {
			x: $mouse.worldX,
			y: $mouse.worldY,
			tileX: $mouse.tileX,
			tileY: $mouse.tileY
		}

		if($tool === 1) {
			let room = $dungeon.rects.findIndex(room => data.tileX >= room.x && data.tileX < room.x + room.w && data.tileY >= room.y && data.tileY <= room.y + room.h);
			let door = $dungeon.doors.findIndex(room => Math.floor(data.tileX) == room.x && Math.floor(data.tileY) == room.y);
			if(room >= 0 && door < 0) {
				$dungeon.rects[room].rotunda = !$dungeon.rects[room].rotunda;
			}
			else if(door >= 0) {
				let d = $dungeon.doors[door];

				if(ev.button === 2) {
					let nx = -d.dir.y;
					let ny =  d.dir.x;
					d.dir = { x: nx, y: ny };
				} else if(ev.button === 0) {
					d.type = (d.type % 8) + 1;
				}
			}
			else {
				let x1 = Math.floor($mouse.tileX);
				let x2 = Math.floor($mouse.clickTileX);
				let y1 = Math.floor($mouse.tileY);
				let y2 = Math.floor($mouse.clickTileY);

				let room = {
					x: Math.min(x1, x2),
					y: Math.min(y1, y2),
					w: Math.max(x1, x2) - Math.min(x1, x2) + 1,
					h: Math.max(y1, y2) - Math.min(y1, y2) + 1,
				}

				if(room.h === 1 && room.w > 1) {
					room.x += 1;
					room.w -= 2;

					$dungeon.rects.push({ x: room.x - 1, y: room.y, w: 1, h: 1 });
					$dungeon.rects.push({ x: room.x + room.w, y: room.y, w: 1, h: 1 });
					$dungeon.doors.push({ x: room.x - 1, y: room.y, dir: {x: 1, y: 0}, type: 1 });
					$dungeon.doors.push({ x: room.x + room.w, y: room.y, dir: {x: 1, y: 0}, type: 1 });
				} else if(room.w === 1 && room.h > 1) {
					room.y += 1;
					room.h -= 2;

					$dungeon.rects.push({ x: room.x, y: room.y - 1, w: 1, h: 1 });
					$dungeon.rects.push({ x: room.x, y: room.y + room.h, w: 1, h: 1 });
					$dungeon.doors.push({ x: room.x, y: room.y - 1, dir: {x: 0, y: 1}, type: 1 });
					$dungeon.doors.push({ x: room.x, y: room.y + room.h, dir: {x: 0, y: 1}, type: 1 });
				} else if(room.w === 1 && room.h === 1) {
					$dungeon.doors.push({ x: room.x, y: room.y, dir: {x: 0, y: 1}, type: 0 });
				}

				$dungeon.rects.push(room);
				$dungeon = $dungeon;
			}
		}

		else if($tool === 2) {
			let room = $dungeon.rects.findIndex(room => data.tileX >= room.x && data.tileX < room.x + room.w && data.tileY >= room.y && data.tileY <= room.y + room.h);
			let door = $dungeon.doors.findIndex(room => Math.floor(data.tileX) == room.x && Math.floor(data.tileY) == room.y);

			if(room >= 0) $dungeon.rects.splice(room, 1);
			if(door >= 0) $dungeon.doors.splice(door, 1);
			$dungeon = $dungeon;
		}
	}

	function handleMouseMove(event) {
		if($mouse.entered) {
			if($mouse.down && $tool == 0) {
				$cam = {
					dx: $cam.dx + ($mouse.screenX - event.x) * $pixelRatio,
					dy: $cam.dy + ($mouse.screenY - event.y) * $pixelRatio
				}
			}

			$mouse.screenX = event.x;
			$mouse.screenY = event.y;
			$mouse.worldX = event.x + $cam.dx/$pixelRatio;
			$mouse.worldY = event.y + $cam.dy/$pixelRatio;
			$mouse.tileX = $mouse.worldX / $tileSize;
			$mouse.tileY = $mouse.worldY / $tileSize;
		}
	}

	function handleMouseDown(event) {
		$mouse.down = true;
		$mouse.clickTileX = $mouse.tileX;
		$mouse.clickTileY = $mouse.tileY;
		clickStart = Date.now();
		if(event.button === 0) dispatch('down', event);
	}
</script>

<canvas
	on:mousemove={handleMouseMove}
	on:mousedown={handleMouseDown}
	on:mouseup={handleMouseUp}
	on:mouseenter={() => $mouse.entered=true}
	on:mouseleave={() => $mouse.entered=false}
	bind:this={canvas}
	width={$width * $pixelRatio}
	height={$height * $pixelRatio}
	style="width: {$width}px; height: {$height}px;"
/>
<svelte:window on:resize|passive={handleResize} />
<slot></slot>

<svelte:body on:contextmenu|preventDefault={()=>console.log("")} />

<style>


</style>
