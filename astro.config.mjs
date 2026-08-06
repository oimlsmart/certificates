// @ts-check
import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://www.oimlsmart.org',
  base: '/certificates',
  output: 'static',
  integrations: [vue()],
  vite: {
    plugins: [tailwindcss()],
    resolve: { dedupe: ['vue'] },
  },
})
