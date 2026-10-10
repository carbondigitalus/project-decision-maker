export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    css: ['~/assets/css/tailwind.css'],
    devtools: { enabled: false },
    modules: ['@nuxtjs/tailwindcss'],
    vite: {
        define: {
            __VUE_PROD_DEVTOOLS__: 'true' // Added quotes around true
        },
        vue: {
            customElement: true // Ensures Vue plugin handles custom configurations safely
        }
    }
});
