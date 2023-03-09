import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import Vue3Toasity , { ToastContainerOptions} from 'vue3-toastify'
import '@/assets/scss/main.scss'
import 'vue3-toastify/dist/index.css';

const pinia = createPinia();

const app = createApp(App)
app.use(pinia);
app.use(Vue3Toasity, {
    // autoClose: 3000,
} as ToastContainerOptions)
app.mount('#app')
