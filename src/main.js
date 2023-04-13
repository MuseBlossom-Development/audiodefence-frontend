import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/router.js'
import store from './store/store';

import './assets/css/style.css';

const app = createApp(App);

app.use(store);
app.use(router);
app.mount('#app');