import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './main.css';
import VuePagination from 'vue-pagination'

createApp(App).use(store).use(router).use(VuePagination).mount('#app')
