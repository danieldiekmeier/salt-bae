import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/kit/vite'

const dev = process.argv.includes('dev')

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    paths: {
      base: dev ? '' : '/salt',
    },
  },

  vitePlugin: {
    experimental: {
      inspector: {
        holdMode: true,
        toggleKeyCombo: 'meta-alt-shift',
      },
    },
  },
}

export default config
