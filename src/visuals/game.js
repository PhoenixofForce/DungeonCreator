import { getContext, onMount, onDestroy } from 'svelte';
import { writable, derived } from 'svelte/store';

// Some props for the app
export const width = writable(window.innerWidth);
export const height = writable(window.innerHeight);
export const pixelRatio = writable(window.devicePixelRatio);
export const context = writable();
export const canvas = writable();
export const cam = writable({dx: 0, dy: 0});
export const time = writable(0);
export const tileSize = writable(32);
export const colors = writable({
	background: "#0E0E0E",
	rooms: "#EEEEEE",
	lastFigureColors: []
})


// A more convenient store for grabbing all game props
export const props = deriveObject({
	context,
	canvas,
	width,
	height,
	pixelRatio,
	time,
});

export const key = Symbol();

export const getState = () => {
	const api = getContext(key);
	return api.getState();
};

export const renderable = (render) => {
	const api = getContext(key);
	const element = {
		ready: false,
		mounted: false
	};
	if (typeof render === 'function') {
		element.render = render;
		element.height = 0;
	} else if (render) {
		if (render.render) element.render = render.render;
		if (render.setup) element.setup = render.setup;
		if (render.height) element.height = render.height;
	}
	api.add(element);
	onMount(() => {
		element.mounted = true;
		return () => {
			api.remove(element);
			element.mounted = false;
		};
	});
}

function deriveObject (obj) {
	const keys = Object.keys(obj);
	const list = keys.map(key => {
		return obj[key];
	});
	return derived(list, (array) => {
		return array.reduce((dict, value, i) => {
			dict[keys[i]] = value;
			return dict;
		}, {});
	});
}
