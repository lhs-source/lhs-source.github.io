import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import VueGTag from "vue-gtag-next";

let GAID = "G-GK9H6TP6JE";  // dev
if(process.env.NODE_ENV === "production") {
    GAID = "G-SH1GZR1KME";  // prod
}


const app = createApp(App)
.use(store)
.use(router)
.use(VueGTag, {
    property: {
        id: GAID, // prod
        useDebugger: true,
    }
})
.mount('#app')
