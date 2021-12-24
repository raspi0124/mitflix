import colors from "vuetify/es5/util/colors";
import { Integrations as TracingIntegrations } from "@sentry/tracing";
import * as Sentry from "@sentry/browser";
const environment =
  process.env.currentenv || process.env.NODE_ENV || "production";
const envSettings = require(`./env.${environment}.js`);

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: "static",

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: "%s - MiFilm",
    title: "MITAPRO Film Festival",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://film.mitapro.jp" },
      { rel: "preconnect", href: "https://storage.googleapis.com" }
      /*{
        rel: "Stylesheet",
        href:
          "https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css",
        defer: true
      }*/
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["@/assets/common.css"],
  env: envSettings,
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: "~plugins/axios.js" },
    { src: "~plugins/sentry-plus.js" },
    { src: "~plugins/strapi.js" },
    { src: "~plugins/vue-plyr.js", ssr: false }

    /*{
      src: "~plugins/ga.js",
      mode: "client"
    }*/
    //  { src: "~plugins/lazyload.js" }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify"
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    // https://go.nuxtjs.dev/content
    //"@nuxt/content",
    "@nuxtjs/auth",
    "nuxt-imagemin",
    "@nuxtjs/sentry",
    "@nuxtjs/strapi",
    "@nuxtjs/toast",
    //Googleの検索結果等に載らないようにするRobots.txtを生成するモジュール
    "@nuxtjs/robots",
    "@nuxtjs/google-gtag"
  ],

  /*
   ** @nuxtjs/pwa Configuration
   ** https://github.com/nuxt-community/pwa-module
   */
  pwa: {
    source: "~/static/favicon-32x32.png"
  },
  manifest: {
    name: "MITAPRO Film Festival",
    lang: "ja",
    short_name: "MiFilm",
    title: "MITAPRO Film Festival",
    "og:title": "MITAPRO Film Festival",
    //新しいPWAインストールプロンプト用 スクリーンショットが用意出来たら入れること
    screenshots: [
      {
        src: "",
        type: "",
        sizes: ""
      }
    ],
    description: "MITAPRO Film Festival",
    theme_color: "red",
    background_color: "#7FBFFF"
  },
  icon: {
    iconFileName: "static/favicon-32x32.png"
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},
  publicRuntimeConfig: {
    STRAPI_URL: process.env.STRAPI_URL || "https://api.mitapro.jp/",
    STRAPI_URL_NU: process.env.STRAPI_URL_NU || "https://api.mitapro.jp"
  },
  //Google Analytics用
  "google-gtag": {
    id: "G-GXB6HHSZQM",
    debug: true // Enable to track in dev mode.
  },
  //Sentryの設定
  sentry: {
    dsn:
      "https://649bebaab4924b3daa28215efb38248b@o517764.ingest.sentry.io/6120258", // Enter your project's DSN here
    lazy: true,
    tracesSampleRate: 1.0,
    integrations: [new TracingIntegrations.BrowserTracing()],
    beforeSend(event, hint) {
      // Check if it is an exception, and if so, show the report dialog
      if (event.exception) {
        Sentry.showReportDialog({ eventId: event.event_id });
      }
      return event;
    },
    vueOptions: {
      tracing: true,
      tracesSampleRate: 1.0,
      integrations: [new TracingIntegrations.BrowserTracing()],
      tracingOptions: {
        hooks: ["mount", "update"],
        timeout: 2000,
        trackComponents: true
      }
    }
  },
  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    treeShake: true,
    defaultAssets: {
      family: false,
      icons: "mdi"
    },
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  strapi: {
    entities: ["projects", "events", "articles", "users", "videos"],
    url: "https://api.mitapro.jp",
    expires: "31d"
  },
  toast: {
    position: "top-right"
  },
  //Googleの検索結果等のIndexに載らないようにする
  robots: {
    UserAgent: "*",
    Disallow: "/"
  },
  generate: {
    fallback: true
  },
  loadingIndicator: {
    name: "rectangle-bounce",
    color: "white",
    background: "black"
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    parallel: true,
    cache: true,
    hardSource: false,
    extend(config, ctx) {
      config.devtool = "inline-cheap-module-source-map";
    }
  }
};
