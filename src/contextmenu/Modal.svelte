<script>
  import { fade } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  import { colors } from '../visuals/game.js';

  let name="";
  let color = '#ff3e00';

  function overlay_click(e) {
      if ('close' in e.target.dataset)
          show = false;
  }

  const dispatch = createEventDispatcher();
  function acceptModal() {
    if(!$colors.lastFigureColors.includes(color)) $colors.lastFigureColors.push(color);
    while($colors.lastFigureColors.length > 11) {
      $colors.lastFigureColors.shift();
    }

    let data = {
      name: name,
      color: color
    }
    dispatch('accept', data);
    show = false;
  }

  function setColor(c) {
    color = c;
  }

  function hideModal() {
    show = false;
  }

  export let show = false;
</script>

{#if show}
  <div>
    <div class="modal-overlay" data-close on:click={overlay_click} transition:fade={{duration: 150}}>
      <div class="modal-container">

	     <div class="content">
         <div class="title"><b>Enter Figure Details</b></div>
         <div><input placeholder="Enter the figures Name" class="is-rounded" bind:value={name} /></div>
         <div class="flex"> <input type="color" bind:value={color} style="height: 50px;"> <span>Select figures Color</span>
        </div>

        <div class="lastUsed">
          {#each [...$colors.lastFigureColors].reverse() as c}
             <button class="button outline" style={"background-color: " + c} on:click={setColor(c)}> </button>
          {/each}
        </div>

         <div class="row">
            <div class="col"></div>
            <div class="col-2">
              <button class="button is-full-width" on:click={hideModal}> Cancel </button>
            </div>
            <div class="col-2">
              <button class="button primary is-full-width" on:click={acceptModal}> Add </button>
            </div>
         </div>
       </div>

      </div>
    </div>
  </div>
{/if}

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.modal-container {
  position: relative;
  background-color: #ffffff;
  bottom: 200px;
  width: 50vw;
  margin: 1rem auto 0.2rem;
  box-shadow: 0 3px 10px #555;
}

.flex {
  display: flex;
	align-items: center;
  margin-top: 10px;
}

.flex span {
  margin-left: 8px;
}

.content {
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  margin-top: 20px;
}

.title {
  margin-bottom: 32px;
  font-size: 24px;
}

.lastUsed {
  margin-bottom: 8px;
}
</style>
