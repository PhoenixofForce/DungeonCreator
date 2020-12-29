<script>
	import { renderable, tileSize, height, width, cam, pixelRatio, colors } from './game.js';

	export let color = $colors.background + '6';

	renderable({
		render: props => {
			const { context, width, height } = props;
			context.save();

			let pr = $pixelRatio;

			let dx = $cam.dx / pr;
			let dy = $cam.dy / pr;
			let w = width;
			let h = height;

			let offX = dx / $tileSize;
			if(offX < 0) offX = Math.floor(offX);
			else offX = Math.ceil(offX);

			let offY = dy / $tileSize;
			if(offY < 0) offY = Math.floor(offY);
			else offY = Math.ceil(offY);

			for(let x = Math.min(0, offX); x < Math.max(0, offX) + w / $tileSize; x++) {
				context.beginPath();
				context.strokeStyle = color;
				context.moveTo(x * $tileSize, dy);
				context.lineTo(x * $tileSize, h + dy);
				context.stroke();
			}

			for(let y = Math.min(0, offY); y < Math.max(0, offY) + h / $tileSize; y++) {
				context.beginPath();
				context.strokeStyle = color;
				context.moveTo(dx, y * $tileSize);
				context.lineTo(dx + w, y * $tileSize);
				context.stroke();
			}

			context.restore();
		}, height: 3
	});
</script>

<!-- The following allows this component to nest children -->
<slot></slot>
