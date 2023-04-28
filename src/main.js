import {createApp} from 'vue'
import mitt from 'mitt';
import App from './App.vue'
import {router} from './router/router.js'
import store from './store/store';
import BootstrapVue3 from 'bootstrap-vue-3'
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import { BNavbar } from 'bootstrap-vue-3'
import "./assets/font/font.css";


const app = createApp(App);
const emitter = mitt();

app.provide('emitter', emitter);
app.use(store);
app.use(router);
app.use(BootstrapVue3)
app.mount('#app');

app.component('b-navbar', BNavbar)