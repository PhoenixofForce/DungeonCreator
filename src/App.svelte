<script>
	import DungeonView from './DungeonView.svelte';
	import ErrorDisplay from './error/ErrorDisplay.svelte';
	import { onDestroy } from 'svelte';
	import CustomMenu from './contextmenu/CustomMenu.svelte';
</script>

<ErrorDisplay />
<DungeonView />
<CustomMenu />

<style>
:global(:root) {
	--bg-color: #ffffff;
	--bg-secondary-color: #f3f3f6;
	--color-primary: #14854F;
	--color-lightGrey: #d2d6dd;
	--color-grey: #747681;
	--color-darkGrey: #3f4144;
	--color-error: #d43939;
	--color-success: #28bd14;
	--grid-maxWidth: 120rem;
	--grid-gutter: 2rem;
	--font-size: 1.6rem;
	--font-color: #333;
	--font-family-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
	--font-family-mono: monaco, "Consolas", "Lucida Console", monospace;
}
</style>
