export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'CryptoSwap.cz - Cryptocurrency exchange',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'keywords', name: 'keywords', content: 'crypto, swap, cryptoswap, exchange' },
            { hid: 'description', name: 'description', content: 'A reliable service that will fulfill its obligations to convert your funds in a timely and complete manner. On our resource you can exchange bitcoins and other digital currencies at the most favorable exchange rate.' },
            { name: 'format-detection', content: 'telephone=yes' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.jpg' },
            { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;700;900&display=swap' },

            { rel: 'stylesheet', href: '/style.css' },
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '~/static/style.css'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [

    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        "@nuxtjs/axios",
        "nuxt-mobile", ['@nuxtjs/dotenv', { systemvars: true }, ],
        "@nuxtjs/i18n"
    ],

    i18n: {
        locales: [
            { code: 'en', iso: 'en-US', file: 'en.js', name: 'English' },
            { code: 'ru', iso: 'ru-RU', file: 'ru.js', name: 'Русский' },
            { code: 'cz', iso: 'cz-CZ', file: 'cz.js', name: 'Čeština' },
            { code: 'ua', iso: 'ua-UA', file: 'ua.js', name: 'Українська' },
        ],
        lazy: true,
        langDir: 'lang/',
        defaultLocale: 'ru',
        vueI18n: {
            fallbackLocale: 'ru',
        },
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            redirectOn: 'root', // recommended
        }
    },

    axios: {
        baseURL: process.env.API,
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {}
}