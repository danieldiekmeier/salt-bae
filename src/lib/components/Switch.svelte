<script>
  let { options, value = $bindable() } = $props()
</script>

<div class="Switch">
  {#each options as option, index}
    <label class="Switch-item" class:is-active={index === value}>
      <input type="radio" bind:group={value} value={index} />
      {option.name}
    </label>
  {/each}
</div>

<style lang="scss">
  $c-main: #424874;

  .Switch {
    display: grid;
    flex: 1;
    grid-template-columns: 1fr 1fr;
    grid-gap: 3px;
    padding: 3px;
    border: 2px solid $c-main;
    border-radius: 6px;
  }

  .Switch-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5em;
    background-color: rgba($c-main, 0.3);
    border-radius: 3px;
    color: $c-main;
    text-align: center;
    line-height: 1.2;

    &:active {
      background-color: rgba($c-main, 0.4);
    }

    input {
      display: none;
    }

    &.is-active {
      color: white;
      background-color: $c-main;
      // font-weight: bold;
    }
  }
</style>
