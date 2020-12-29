<script>
	import { renderable, width, height, tileSize, colors } from './game.js';
	import { mouse } from './mouse.js';
	import { tool } from '../stores.js';

	let color = $colors.rooms + "";

	renderable({
		render: (props, dt) => {
			const { context, width, height } = props;
			context.save();

			if($mouse.entered && $mouse.down && $tool === 1) {
				console.log($tool + " " + $mouse.entered + " " + $mouse.down);

				let x1 = Math.floor($mouse.clickTileX);
				let y1 = Math.floor($mouse.clickTileY);
				let x2 = Math.floor($mouse.tileX);
				let y2 = Math.floor($mouse.tileY);

				let startX = Math.min(x1, x2);
				let startY = Math.min(y1, y2)
				let endX = Math.max(x1, x2) + 1;
				let endY = Math.max(y1, y2) + 1;

				context.fillStyle = color;
				context.fillRect(startX * $tileSize, startY * $tileSize, (endX - startX) * $tileSize, (endY - startY) * $tileSize);
			}

			context.restore();
		}, height: 2
	});
</script>
