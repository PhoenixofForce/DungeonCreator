<script>
	import Menu from './Menu.svelte';
	import MenuOption from './MenuOption.svelte';
	import MenuDivider from './MenuDivider.svelte';
	import { tick } from 'svelte';
	import { mouse } from '../visuals/mouse.js';
	import { dungeon, tool } from '../stores.js';
	import { cam } from '../visuals/game.js';
	import Modal from './Modal.svelte';

	let pos = { x: 0, y: 0 };

	let showMenu = false;
	async function onRightClick(e) {
		if (showMenu) {
			showMenu = false;
			await new Promise(res => setTimeout(res, 100));
		}

		pos = { x: $mouse.screenX, y: $mouse.screenY};
		if($tool != 1) showMenu = true;
	}

	function closeMenu() {
		showMenu = false;
	}

	function resetCamera() {
		$cam.dx = 0;
		$cam.dy = 0;
	}
</script>

{#if showMenu}
	<Menu {...pos} on:click={closeMenu} on:clickoutside={closeMenu}>
		<MenuOption
			on:click={resetCamera}
			text="Reset Camera" />
	</Menu>
{/if}

<svelte:body on:contextmenu|preventDefault={onRightClick} />
