const bodyParser = require("body-parser")

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'StateHelpPoliciesApp',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet' },
      { rel: "stylesheet", href: "https://use.fontawesome.com/releases/v5.15.3/css/all.css", integrity: "sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk", crossorigin: "anonymous" }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  serverMiddleware: [
    bodyParser.json(),
    '~/api'
  ],
  env: {
    downloadUrl: 'http://localhost:3000/api/downloadData/',
    dbUrl: 'http://localhost:3000/api/medicalData/',
    mongoDbUrl: 'mongodb+srv://admin-sanjay:test123@cluster0.bsc3x.mongodb.net/phoenixDB?retryWrites=true&w=majority'
  },
  router: {
    //middleware: 'getOrgId'
  }
}


