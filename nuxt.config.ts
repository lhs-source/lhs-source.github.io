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
    "@nuxtjs/tailwindcss"
  ],
  content: {
    markdown: {
    }
  },
  colorMode: {
    classSuffix: ''
  }
})