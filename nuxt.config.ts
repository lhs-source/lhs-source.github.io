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
    "@nuxt/image"
  ],
  content: {
    markdown: {
      toc: {
        depth: 2,
        searchDepth: 2
      },
    },
    highlight: {
      theme: 'github-dark',
    },
  },
  colorMode: {
    classSuffix: ''
  }
})