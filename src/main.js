import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/router.js'
import store from './store/store';
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import { BImg } from 'bootstrap-vue-3'
import "bootstrap-icons/font/bootstrap-icons.css";
const app = createApp(App);

app.use(store);
app.use(router);
app.use(BootstrapVue3)
app.component('b-img', BImg);
app.mount('#app');
