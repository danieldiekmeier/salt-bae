<script>
  import Switch from '$lib/components/Switch.svelte'
  import * as Spoons from '../lib/spoons'
  import claraImage from '../assets/clara.png'

  const salts = [
    { name: 'Morton’s Kosher Salt', gramsPerTeaSpoon: 241 / 48, bold: true },
    {
      name: 'Diamond Crystal Kosher Salt',
      gramsPerTeaSpoon: 137 / 48,
      bold: true,
    },
  ]

  let selectedSalt = $state(0)
  let amount = $state(1)
  let result = $derived(
    (salts[selectedSalt].gramsPerTeaSpoon * amount).toFixed(2),
  )

  function changeAmount(howMuch) {
    return () => (amount = Math.max(amount + howMuch, 0))
  }
</script>

<div class="u-limiter" id="top">
  <div class="Bean">
    <h1 class="Bean-title">Salt Bae</h1>
    <img src={claraImage} alt="" class="Bean-image" />
  </div>

  <div class="Container">
    <p class="Of">The recipe calls for</p>
    <div class="Display">
      <button class="ResetButton" onclick={() => (amount = 0)}>Reset</button>
      {Spoons.convert(amount)}
    </div>

    <div class="NumPad">
      <div class="NumPad-buttonContainer">
        {#each [0.125, 0.25, 0.5, 1] as change}
          <button class="NumPad-button" onclick={changeAmount(change)}>
            + {Spoons.convert(change)}
          </button>
        {/each}
      </div>
    </div>

    <p class="Of">of</p>

    <Switch options={salts} bind:value={selectedSalt} />

    <p style="margin-top: 1em;">
      That's about
      <strong class="Result-number">{result}g</strong>
      of salt.
    </p>
  </div>

  <div class="Explanation">
    <h2>What is this?</h2>

    <p>
      Lots of recipes (for example those by <a
        href="https://www.bonappetit.com/">Bon Appétit</a
      >) call for a specific amount of salt but only specify the volumes for
      specific brands of salt. Home cooks outside the US (like me!) may not be
      able to get salt from the specified brands, but still want to use the
      correct amount of salt.
    </p>

    <p>
      That’s why I built <strong>Salt Bae</strong>: It converts teaspoons of
      <em>Morton’s Kosher Salt</em>
      or <em>Diamond Crystal Kosher Salt</em> to their weight in grams.
    </p>

    <h2>How to Use</h2>

    <p
      >Enter the needed amount of teaspoons and select the Salt that is
      specified in the recipe. <strong>Salt Bae</strong> will instantly display how
      many grams of salt you need.</p
    >

    <p>
      <strong>For example:</strong> If the recipe calls for
      <a
        href="#top"
        onclick={(event) => {
          amount = 2.5
          selectedSalt = 1
        }}>2½ tsp of Diamond Crystal</a
      >, you can see that you need around <strong>7.14g</strong> of whatever salt
      you want to use.
    </p>

    <hr />

    <p class="Explanation-who">
      Built by <a href="https://twitter.com/danjel">@danjel</a> with feedback
      from <a href="https://twitter.com/wundertaeter">@wundertaeter</a>.
    </p>
  </div>
</div>

<style lang="scss">
  $c-background: #ffda08;
  $c-main: #424874;

  @font-face {
    font-family: 'Nunito';
    font-style: normal;
    font-weight: normal;
    src:
      local('Nunito SemiBold'),
      local('Nunito-SemiBold'),
      url('../assets/fonts/nunito-v12-latin-600.woff2') format('woff2'),
      url('../assets/fonts/nunito-v12-latin-600.woff') format('woff');
  }

  @font-face {
    font-family: 'Nunito';
    font-style: italic;
    font-weight: normal;
    src:
      local('Nunito SemiBold Italic'),
      local('Nunito-SemiBoldItalic'),
      url('../assets/fonts/nunito-v12-latin-600italic.woff2') format('woff2'),
      url('../assets/fonts/nunito-v12-latin-600italic.woff') format('woff');
  }

  @font-face {
    font-family: 'Nunito';
    font-style: normal;
    font-weight: 900;
    src:
      local('Nunito Black'),
      local('Nunito-Black'),
      url('../assets/fonts/nunito-v12-latin-900.woff2') format('woff2'),
      url('../assets/fonts/nunito-v12-latin-900.woff') format('woff');
  }

  :global(*) {
    position: relative;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    box-sizing: border-box;
  }

  :global(body) {
    padding: 0.5em;
    padding-top: 0;
    font-family:
      'Nunito',
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      'Open Sans',
      'Helvetica Neue',
      sans-serif;
    font-size: 16px;
    line-height: 1.4;
    background-color: rgba($c-main, 0.05);

    @media (min-width: 350px) {
      padding-left: 1em;
      padding-right: 1em;
    }
  }

  :global(button, input) {
    font-family: inherit;
  }

  .u-limiter {
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }

  .Bean {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2em;
    padding-left: 1em;
    padding-right: 1em;

    @media (min-width: 500px) {
      padding-left: 2em;
      padding-right: 2em;
    }
  }

  .Bean-title {
    font-size: 3em;
    line-height: 0.8;
    color: $c-main;
    letter-spacing: -0.03em;

    @media (min-width: 375px) {
      font-size: 4em;
    }
  }

  .Bean-image {
    display: block;
    width: calc(292px / 2);
    height: calc(264px / 2);
    min-width: calc(728px / 5);

    @media (min-width: 350px) {
      margin-right: 1em;
    }
  }

  .Container {
    padding: 1em;

    background-color: $c-background;
    // border: 3px solid $c-main;
    border-radius: 1em;
    box-shadow:
      1px 1px $c-main,
      2px 2px $c-main,
      3px 3px $c-main,
      4px 4px $c-main;
    color: $c-main;

    @media (min-width: 500px) {
      padding: 2em;
    }
  }

  .Display {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    margin-top: 0.5rem;
    margin-bottom: 3px;
    padding: 0.5em;
    padding-top: 0.5em;
    padding-right: 0.75em;
    padding-bottom: 0.5em;
    border-radius: 3px;
    background-color: #fff;
    font-size: 1.5em;
    font-weight: 900;
    font-variant-numeric: tabular-nums;
    text-align: right;
    line-height: 1;
  }

  .NumPad {
    touch-action: manipulation;
  }

  .ResetButton {
    border: 0;
    padding: 0.75em;
    border-radius: 3px;
    background-color: rgba($c-main, 0.1);
    color: rgba($c-main, 0.5);
    font-size: 1rem;
    font-weight: bold;
    line-height: 1;

    &:hover {
      background-color: rgba($c-main, 0.2);
    }

    &:active {
      background-color: rgba($c-main, 0.3);
    }
  }

  .NumPad-buttonContainer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 3px;
  }

  .NumPad-button {
    padding-top: 0.75em;
    padding-left: 0.5em;
    padding-right: 0.5em;
    padding-bottom: 0.75em;
    border: 0;
    border-radius: 3px;
    background-color: $c-main;
    color: #fff;
    font-size: 1em;
    line-height: 1.1;
    font-variant-numeric: tabular-nums;

    &:disabled,
    &:disabled:hover {
      background-color: lighten(desaturate($c-main, 55%), 25%);
    }

    &:hover {
      background-color: darken($c-main, 5%);
    }

    &:active {
      background-color: darken($c-main, 9%);
    }
  }

  .Of {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }

  .Explanation {
    margin-top: 2rem;
    padding-left: 1em;
    padding-right: 1em;
    margin-bottom: 2em;
    color: $c-main;

    @media (min-width: 500px) {
      padding-left: 2em;
      padding-right: 2em;
    }

    h2 {
      margin-top: 1rem;
      margin-bottom: 0.25rem;
      font-weight: 900;
    }

    p + p {
      margin-top: 0.25rem;
    }

    a {
      color: inherit;
    }

    hr {
      margin-top: 2em;
      margin-bottom: 2em;
      border: 0;
      border-bottom: 2px solid $c-main;
    }
  }

  .Explanation-who {
    font-size: 0.75em;
    text-align: center;
  }

  .Result-number {
    margin-left: 0.25rem;
    margin-right: 0.25rem;
    font-size: 2em;
    font-weight: 900;
  }
</style>
