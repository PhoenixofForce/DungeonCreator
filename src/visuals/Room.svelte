<script>
	import { renderable, width, height, tileSize, colors } from './game.js';

	let color = '#F8F8F4';
	export let dimension;

	renderable({
		render: (props, dt) => {
			const { context, width, height } = props;
			context.save();

			if(dimension) {
				let x = dimension.x * $tileSize;
				let y = dimension.y * $tileSize;
				let w = dimension.w * $tileSize;
				let h = dimension.h * $tileSize;

				if(!dimension.rotunda) {
					context.fillStyle = $colors.rooms;
					context.fillRect(x, y, w, h);
				} else {
					context.beginPath();
					context.fillStyle = $colors.rooms;
					context.ellipse(x + w/2, y + h/2, w/2, h/2, 0, 0, Math.PI * 2);
					context.closePath();
					context.fill();
					context.beginPath();
				}
			}

			context.restore();
		}, height: 1
	});
</script>
