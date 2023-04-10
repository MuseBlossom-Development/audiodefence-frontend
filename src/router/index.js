import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('../views/Home.vue');

const routes = [
    { path: '/', name:"Home", component: Home }, 
    { path: '/signup', name:"Signup", component: () =>import('../views/Signup.vue') }, 
    { path: '/login', name:"Login", component: () =>import('../views/Login.vue') }, 
    { path: '/pwinquiry', name:"Pwinquiry", component: () =>import('../views/Pwinquiry.vue') }, 
    { path: '/about', name:"About", component: () =>import('../views/About.vue') }, 
    { path: '/faq', name:"FAQ", component: () =>import('../views/FAQ.vue') }, 
    { path: '/contact', name:"Contact", component: () =>import('../views/Contact.vue') }, 
    { path: '/dashboard', name:"Dashboard", component: () =>import('../views/Dashboard.vue')  },
    { path: '/mail', name:"Mail", component: () =>import('../views/Mail.vue') }, 
    { path: '/download', name:"Download", component: () =>import('../views/Download.vue')  },
    { path: '/cloud', name:"Cloud", component: () =>import('../views/Cloud.vue') }, 
    { path: '/detection', name:"Detection", component: () =>import('../views/Detection.vue') }, 
    { path: '/account', name:"Account", component: () =>import('../views/Dashboard/Account.vue')  },
    { path: '/contactlist', name:"Contactlist", component: () =>import('../views/Dashboard/Contactlist.vue')  },
    { path: '/links', name:"Links", component: () =>import('../views/Dashboard/Links.vue')  },
    { path: '/signatures', name:"Signatures", component: () =>import('../views/Dashboard/Signatures.vue')  },
    { path: '/activity', name:"Activity", component: () =>import('../views/Dashboard/Activity.vue')  },
    { path: '/price', name:"Price", component: () =>import('../views/Dashboard/Price.vue')  }


];

// 라우터 생성
const router = createRouter({
    history: createWebHistory(),
    routes
});

// 라우터 추출 (main.js에서 import)
export {router} 