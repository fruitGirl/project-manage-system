const pkg = require('./package');
const domain = require('./domain.config');

module.exports = {
  mode: 'spa',
  generate: {
    dir: './dist',
    subFolders: false,
    fallback: 'index.html',
    exclude: [/test/, /auth/, /document/, /product/, /project/, /system/, /test/]
  },
  server: {
    host: '0.0.0.0',
    port: '8080'
  },
  env: {
    baseUrl: (function() {
       return domain.baseURL;
    })()
  },
  dev: {
    baseUrl: ''
  },
  /*
   ** Headers of the page
   */
  head: {
    title: '大象',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/images/common/logo_mini.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: false,
  loadingIndicator: {
    name: 'rectangle-bounce',
    color: '#409eff',
    background: '#f0f2f5'
  },

  /*
   ** Global CSS
   */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/styles/reset.less',
    '@/styles/main.less',
    '@/styles/theme.less',
    'quill/dist/quill.snow.css',
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '@/plugins/element-ui' },
    { src: '@/plugins/combined-inject' },
    { src: '@/plugins/mixin' }
    // { src: '@/plugins/v-charts', ssr: false }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    proxy: true //  代理
    // See https://github.com/nuxt-community/axios-module#options
  },
  /*
   ** proxy module configuration
   */
  // proxy: {
  //   '/api': {
  //     target: 'http://pm-api.xiangxin.net/',
  //     changeOrigin: true, // 是否跨域
  //     pathRewrite: {
  //       '^/api': '' // 路径重写
  //     }
  //   }
  // },
  /*
   ** Build configuration
   */
  build: {
    // analyze: true, // 是否开启打包分析
    transpile: [/^element-ui/],

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',

          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        });
      }
    },

    filenames: {
      app: ({ isDev }) => (isDev ? '[name].js' : '[name].[chunkhash].js'),
      chunk: ({ isDev }) => (isDev ? '[name].js' : '[name].[chunkhash].js'),
      css: ({ isDev }) => (isDev ? '[name].css' : '[name].[contenthash].css')
    },
    extractCSS: {
      ignoreOrder: true
    }
  },
  router: {
    middleware: 'check-auth'
  }
};
