import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueGTag from "vue-gtag-next";


const app = createApp(App)
.use(store)
.use(router)
.use(VueGTag, {
    property: "G-SH1GZR1KME",
}, router)
.mount('#app')