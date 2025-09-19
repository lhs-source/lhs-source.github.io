// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    "@nuxt/content",
    "shadcn-nuxt",
    '@nuxtjs/color-mode',
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    '@pinia/nuxt',
  ],
  content: {
    build: {
      markdown: {
        toc: {
          depth: 2,
          searchDepth: 2
        },
      },
      // highlight: {
      //   theme: 'github-dark',
      // },
    }
  },
  mdc: { },
  colorMode: {
    classSuffix: ''
  },
  pinia: {
    // autoImports: ['defineStore', 'acceptHMRUpdate'],
  },
  compatibilityDate: '2025-01-20',
  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  }
})