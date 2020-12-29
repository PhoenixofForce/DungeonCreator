<script>
	import { renderable, width, height, tileSize, colors } from './game.js';

	export let dimension;

	renderable({
		render: (props, dt) => {
			const { context, width, height } = props;
			context.save();

			if(dimension) {
				if(dimension.type > 0) {
					if(dimension.type == 1) {	//Normal Door
						drawSmallWay(context);
						drawDoor(context, 1);
					} else if(dimension.type == 2) {	//Smaller Way
						drawSmallWay(context);
					} else if(dimension.type == 3) {	//STAIR UP
							drawStair(context);
					} else if(dimension.type == 4){	//??

					} else if(dimension.type == 5) {	//DOUBLE DOOR
						drawSmallWay(context);
						drawDoor(context, 5);
					} else if(dimension.type == 6) {	//HIDDEN
						drawHidden(context);
					} else if(dimension.type == 7) {	//GITTER TÜR ?
						drawSmallWay(context);
						drawDoor(context, 1);
					} else if(dimension.type == 8) {	//STAIR DOWN
						drawStair(context);
					}
				}
			}

			context.restore();
		}, height: 2
	});

	function drawSmallWay(context) {
		context.fillStyle = $colors.background;

		let x = dimension.x * $tileSize;
		let y = dimension.y * $tileSize;
		let w = $tileSize;
		let h = $tileSize;

		if(Math.abs(dimension.dir.y) == 1) {
			h /= 2;
			y += h/2;
			w = $tileSize / 8;
		} else {
			w /= 2;
			x += w/2;
			h = $tileSize / 8;
		}

		context.fillRect(x, y, w, h);

		if(Math.abs(dimension.dir.y) == 1) {
			x += $tileSize - w;
		} else {
			y += $tileSize - h;
		}

		context.fillRect(x, y, w, h);
	}

	function drawDoor(context, style) {
		context.strokeStyle = $colors.background;

		let x = dimension.x * $tileSize;
		let y = dimension.y * $tileSize;
		let w = $tileSize;
		let h = $tileSize;

		if(style == 1) {
			if(Math.abs(dimension.dir.y) == 1) {
				h /= 4;
				y += h * 1.5;
			} else {
				w /= 4;
				x += w * 1.5;
			}

			context.strokeRect(x, y, w, h);
		} else if(style == 5) {
			if(Math.abs(dimension.dir.y) == 1) {
				h /= 4;
				y += h * 1.5;
				w /= 2;
			} else {
				w /= 4;
				x += w * 1.5;
				h /= 2;
			}

			context.strokeRect(x, y, w, h);

			if(Math.abs(dimension.dir.y) == 1) {
				x += w;
			} else {
				y+= h;
			}
			context.strokeRect(x, y, w, h);
		}
	}

	function drawHidden(context) {
		context.fillStyle = $colors.background;

		let x = dimension.x * $tileSize;
		let y = dimension.y * $tileSize;
		let w = $tileSize;
		let h = $tileSize;

		if(Math.abs(dimension.dir.y) == 1) {
			h /= 2;
			if(dimension.dir.y == -1) y += h;
		} else {
			w /= 2;
			if(dimension.dir.x == -1) x += w;
		}

		context.fillRect(x, y, w, h);
	}

	function drawStair(context) {
		context.fillStyle = $colors.background;

		let x = dimension.x * $tileSize;
		let y = dimension.y * $tileSize;
		let w = $tileSize;
		let h = $tileSize;

		let lineCount = 4;
		let lineLength = 0.8 * $tileSize;
		let lineDistance = $tileSize / 5;

		if(Math.abs(dimension.dir.x) == 1) {
			if(dimension.dir.x == -1) {
				x += $tileSize;
				lineDistance *= -1;
			}

			for(let i = 0; i < lineCount; i++){
				x += lineDistance;

				context.moveTo(x, y + ($tileSize - lineLength)/2);
				context.lineTo(x, y + ($tileSize - lineLength)/2 + lineLength );

				lineLength = 0.8 * lineLength
			}
		} else {
			if(Math.abs(dimension.dir.y) == 1) {
				if(dimension.dir.y == -1) {
					y += $tileSize;
					lineDistance *= -1;
				}

				for(let i = 0; i < lineCount; i++){
					y += lineDistance;

					context.moveTo(x + ($tileSize - lineLength)/2, y);
					context.lineTo(x + ($tileSize - lineLength)/2 + lineLength , y);

					lineLength = 0.8 * lineLength
				}
			}
		}

		context.stroke();
	}
</script>
