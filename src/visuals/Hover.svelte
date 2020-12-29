<script>
	import { renderable, width, height, tileSize } from './game.js';

	export let color = '#F8F8F4';
	export let dimension;

	renderable({
		render: (props, dt) => {
			const { context, width, height } = props;
			context.save();

			if(dimension) {
				context.strokeStyle = '#FF0';
	      context.lineWidth = 3;
				context.strokeRect(dimension.x * $tileSize, dimension.y * $tileSize, dimension.w * $tileSize, dimension.h * $tileSize);
	      context.lineWidth = 1;
			}

			context.restore();
		}, height: 4
	});
</script>
