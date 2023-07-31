import './style.scss'
import App from './App.vue'
import { ViteSSG } from 'vite-ssg';
// virtual:generated-layouts
//   tsconfig.json-compilerOptions-types
//   "vite-plugin-vue-layouts/client"
import { setupLayouts } from 'virtual:generated-layouts'
// virtual:generated-pages
//   tsconfig.json-compilerOptions-types
//   "vite-plugin-pages/client"
import generatedRoutes from 'virtual:generated-pages'
import { createPinia } from 'pinia';
import { createHead } from '@vueuse/head';


const routes = setupLayouts(generatedRoutes)
const pinia = createPinia();
const head = createHead();

// createApp(App).mount('#app')
export const createApp = ViteSSG(
    // 루트 컴포넌트
    App,
    { routes },
    ({ app, router, routes, isClient, initialState }) => {
        // 플러그인 세팅
        app.use(pinia);
        if (isClient)
          pinia.state.value = (initialState.pinia) || {}
        else
          initialState.pinia = pinia.state.value
        // 메타태그 세팅
        app.use(head);
    },
)