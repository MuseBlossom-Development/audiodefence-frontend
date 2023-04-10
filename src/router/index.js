import { createRouter, createWebHistory } from 'vue-router';
///import Home from '../views/Home.vue'
//import About from '../views/About.vue'
//import Dashboard from '../views/Dashboard.vue'

const Home = () => import('../views/Home.vue');

const routes = [
    { path: '/', component: Home }, 
    { path: '/about', component: () =>import('../views/About.vue') }, 
    { path: '/faq', component: () =>import('../views/FAQ.vue') }, 
    { path: '/contact', component: () =>import('../views/Contact.vue') }, 
    { path: '/dashboard', component: () =>import('../views/Dashboard.vue')  },
    { path: '/mail', component: () =>import('../views/Mail.vue') }, 
    { path: '/download', component: () =>import('../views/Download.vue')  },
    { path: '/cloud', component: () =>import('../views/Cloud.vue') }, 
    { path: '/detection', component: () =>import('../views/Detection.vue') }, 
    { path: '/account', component: () =>import('../views/Dashboard/Account.vue')  },
    { path: '/contactlist', component: () =>import('../views/Dashboard/Contactlist.vue')  },
    { path: '/links', component: () =>import('../views/Dashboard/Links.vue')  },
    { path: '/signatures', component: () =>import('../views/Dashboard/Signatures.vue')  },
    { path: '/activity', component: () =>import('../views/Dashboard/Activity.vue')  },
    { path: '/price', component: () =>import('../views/Dashboard/Price.vue')  }


];

// 라우터 생성
const router = createRouter({
    history: createWebHistory(),
    routes
});

// 라우터 추출 (main.js에서 import)
export {router}