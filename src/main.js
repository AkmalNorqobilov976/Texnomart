import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import VueAwesomePaginate from "vue-awesome-paginate";
import Vue3Toasity from 'vue3-toastify';
import VueRippler from "vue-rippler";
// necessary css file

const pinia = createPinia();

import '@/assets/scss/main.scss'
import "vue-awesome-paginate/dist/style.css";
import 'vue3-toastify/dist/index.css';
import 'remixicon/fonts/remixicon.css'
import 'nprogress/nprogress.css'
const app = createApp(App)

app.use(router);
app.use(pinia);


app.use(VueAwesomePaginate);
app.use(Vue3Toasity);
app.use(VueRippler);

app.mount('#app')
