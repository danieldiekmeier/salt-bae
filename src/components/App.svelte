<script>
  import * as Spoons from "../lib/spoons";

  let selected = 0;
  let selectedSalt = 0;
  let amount = 1;

  const options = [
    { name: "1/8 tsp", amount: 1 / 8 },
    { name: "1/4 tsp", amount: 1 / 4 },
    { name: "1/2 tsp", amount: 1 / 2 },
    { name: "1 tsp", amount: 1 },
    { name: "2 3/4", amount: 2.75 },
    { name: "1 1/2", amount: 1.5 },
    { name: "1 tbsp", amount: 3 }
  ];

  const salts = [
    { name: "Morton’s Kosher Salt", gramsPerTeaSpoon: 241 / 48, bold: true },
    {
      name: "Diamond Crystal Kosher Salt",
      gramsPerTeaSpoon: 137 / 48,
      bold: true
    }
    // { name: "Morton’s Table Salt", gramsPerTeaSpoon: 76.0 / 12 },
    // { name: "Morton Pickling Salt", gramsPerTeaSpoon: 74.0 / 12 },
    // { name: "La Baleine Coarse Sea Salt", gramsPerTeaSpoon: 66.8 / 12 },
    // { name: "Real Salt Fine Sea Salt", gramsPerTeaSpoon: 65.0 / 12 },
    // { name: "La Baleine Fine Sea Salt", gramsPerTeaSpoon: 64.8 / 12 },
    // { name: "Real Salt Kosher Salt", gramsPerTeaSpoon: 64.0 / 12 },
    // { name: "Maldon Sea Salt", gramsPerTeaSpoon: 33.2 / 12 }
  ];

  function changeAmount(howMuch) {
    return () => (amount = Math.max(amount + howMuch, 0));
  }
</script>

<style lang="scss">
  :global(*) {
    position: relative;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  }

  :global(body) {
    padding: 1em;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    line-height: 1.4;
  }

  .Container {
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
    padding: 1em;

    background-color: #dee3e2;
    border: 3px solid #18b0b0;
    border-radius: 1em;
    box-shadow: 0 5px 10px rgba(black, 0.1);
  }

  .Display {
    padding: 1em;
    background-color: #fff;
    font-variant-numeric: tabular-nums;
  }

  .Measurements {
    display: flex;
    width: 100%;
  }

  .Measurement {
    flex: 1;
    font-size: 14px;
    text-align: center;
  }

  .Measurement.is-active {
    font-weight: bold;
    border-bottom: 2px solid green;
  }

  .Salts {
    width: 100%;
    margin-top: 2rem;
    font-variant-numeric: tabular-nums;
  }

  .Salt--important td {
    /* font-weight: bold; */
  }

  .Salt-weight {
    text-align: right;
  }

  .NumPad {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 3px;
    margin-top: 2em;
  }

  .NumPad-clearContainer {
  }

  .NumPad-clearButton {
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: 3px;
    background-color: #de7119;
    color: #fff;
    font-size: 1em;
    font-weight: bold;

    &:disabled,
    &:disabled:hover {
      background-color: lighten(desaturate(#de7119, 55%), 25%);
    }

    &:hover {
      background-color: darken(#de7119, 3%);
    }

    &:active {
      background-color: darken(#de7119, 5%);
    }
  }

  .NumPad-buttonContainer {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 3px;
  }

  .NumPad-button {
    padding: 1em;
    border: 0;
    border-radius: 3px;
    background-color: #18b0b0;
    color: #fff;
    font-size: 1em;

    &:disabled,
    &:disabled:hover {
      background-color: lighten(desaturate(#18b0b0, 55%), 25%);
    }

    &:hover {
      background-color: darken(#18b0b0, 3%);
    }

    &:active {
      background-color: darken(#18b0b0, 5%);
    }
  }
</style>

<div class="Container">
  <!-- <input type="range" bind:value={selected} min="0" max={options.length - 1} /> -->

  <p>Recipe calls for</p>

  <h1 class="Display">{Spoons.convert(amount)}</h1>

  <p>of</p>

  <div>
    {#each salts as salt, index}
      <div>
        <label>
          <input type="radio" bind:group={selectedSalt} value={index} />
          {salt.name}
        </label>
      </div>
    {/each}
  </div>

  <p>
    that's about
    <strong>
      {(salts[selectedSalt].gramsPerTeaSpoon * amount).toFixed(2)}g
    </strong>
  </p>

  <!-- <div class="Measurements">
    {#each options as option, index}
      <div
        class="Measurement {index === selected ? 'is-active' : ''}"
        on:click={() => (selected = index)}>
        {option.name}
      </div>
    {/each}
  </div> -->

  <!-- <table class="Salts">
    {#each salts as salt}
      <tr class="Salt {salt.bold ? 'Salt--important' : ''}">
        <td>{salt.name}</td>
        <td class="Salt-weight">
          {(salt.gramsPerTeaSpoon * amount).toFixed(2)}g
        </td>
      </tr>
    {/each}
  </table> -->

  <div class="NumPad">
    <div class="NumPad-clearContainer">
      <button class="NumPad-clearButton" on:click={() => (amount = 0)}>
        Reset
      </button>
    </div>

    <div class="NumPad-buttonContainer">
      {#each [0.125, 0.25, 0.5, 1] as change}
        <!-- <button
          class="NumPad-button"
          on:click={changeAmount(-change)}
          disabled={amount === 0}>
          - {Spoons.convert(change)}
        </button> -->
        <button class="NumPad-button" on:click={changeAmount(change)}>
          + {Spoons.convert(change)}
        </button>
      {/each}
    </div>
  </div>
</div>
