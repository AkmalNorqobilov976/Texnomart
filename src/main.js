import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import VueAwesomePaginate from "vue-awesome-paginate";
import Vue3Toasity from 'vue3-toastify';
import VueRippler from "vue-rippler";
import vue3StarRatings from "vue3-star-ratings";

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

app.component('vue3-star-ratings', vue3StarRatings);

app.use(VueAwesomePaginate);
app.use(Vue3Toasity);
app.use(VueRippler);

app.mount('#app')
