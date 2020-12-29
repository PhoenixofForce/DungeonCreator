<script>
  import { error, resetError } from './errorstore.js';
  import { fly } from 'svelte/transition';
</script>

{#if $error.message}
<div class="bg-error text-white flex-container" transition:fly={{y: -100, opacity: 1}}>
	<span class=""> { $error.message } </span>
	<button class="button clear icon-only" on:click={ resetError }>
		<img alt="Close Error" title="Close Error" src="https://icongr.am/feather/x.svg?size=16&color=FFFFFF">
	</button>
</div>
{/if}

<style>
.flex-container {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.bg-error {
	padding-left: 16px;
	position: fixed;
	width: 100%;
	z-index: 10;
  top: 0;
}
</style>
