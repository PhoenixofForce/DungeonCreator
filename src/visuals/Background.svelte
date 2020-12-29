<script>
	import { renderable, colors, cam, pixelRatio } from './game.js';
	let color = $colors.background + "F";

	renderable(props => {
		const { context, width, height } = props;

		context.save();
		let pr = $pixelRatio;

		context.clearRect($cam.dx/ pr, $cam.dy/ pr, width, height);
		if (color) {
			context.fillStyle = color;
			context.fillRect($cam.dx/ pr, $cam.dy/ $pixelRatio, width, height);
		}

		context.restore();
	});
</script>

<!-- The following allows this component to nest children -->
<slot></slot>
