import {createRouter, createWebHistory} from 'vue-router';
import store from '../store/store';
import {IS_USER_AUTHENTICATE_GETTER} from '../store/storeconstants';
import Home from '../views/Home.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    }, {
        path: '/login',
        name: 'Login',
        component: () => import ('@/views/Login.vue'),
        meta: {
            auth: false
        }
    }, {
        path: '/signup',
        name: 'Signup',
        component: () => import ('@/views/Signup.vue'),
        meta: {
            auth: false
        }
    }, {
        path: '/pwinquiry',
        name: 'Pwinquiry',
        component: () => import ('@/views/Pwinquiry.vue'),
        meta: {
            auth: false
        }
    }, {
        path: '/about',
        name: 'About',
        component: () => import ('@/views/About.vue'),
    }, {
        path: '/faq',
        name: 'Faq',
        component: () => import ('@/views/FAQ.vue'),
    }, {
        path: '/contact',
        name: 'Contact',
        component: () => import ('@/views/Contact.vue'),
    }, {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import ('@/views/Dashboard.vue'),
        meta: {
            auth: true
        },
        children: [
            {
                path: '/account',
                name: 'Account',
                component: () => import ('@/views/dashboard/Account.vue'),
                meta: {
                    auth: true
                }
            }, {
                path: '/contactlist',
                name: 'Contactlist',
                component: () => import ('@/views/dashboard/Contactlist.vue'),
                meta: {
                    auth: true
                }
            }, {
                path: '/links',
                name: 'Links',
                component: () => import ('@/views/dashboard/Links.vue'),
                meta: {
                    auth: true
                }
            }, {
                path: '/signatures',
                name: 'Signatures',
                component:() => import ('@/views/dashboard/Signatures.vue'),
                meta: {
                    auth: true
                }
            }, {
                path: '/activity',
                name: 'Activity',
                component: () => import ('@/views/dashboard/Activity.vue'),
                meta: {
                    auth: true
                }
            }, {
                path: '/price',
                name: 'Price',
                component: () => import ('@/views/dashboard/Price.vue'),
                meta: {
                    auth: true
                }
            }
            ]
        }, {
            path: '/mail',
            name: 'Mail',
            component: () => import ('@/views/Mail.vue'),
            meta: {
                auth: true
            }
        }, {
            path: '/download',
            name: 'Download',
            component: () => import ('@/views/Download.vue'),
            meta: {
                auth: true
            }
        }, {
            path: '/cloud',
            name: 'Cloud',
            component: () => import ('@/views/Cloud.vue'),
            meta: {
                auth: true
            }
        }, {
            path: '/detection',
            name: 'Detection',
            component: () => import ('@/views/Detection.vue'),
            meta: {
                auth: true
            }
        }
    ];

    // 라우터 생성
    const router = createRouter({history: createWebHistory(), routes});

    router.beforeEach((to, from, next) => {
        if ('auth' in to.meta && to.meta.auth && !store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]) {
            next('/login');
        } else if ('auth' in to.meta && !to.meta.auth && store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]) {
            next('/dashboard');
        } else {
            next();
        }
    });

    // 라우터 추출 (main.js에서 import)
    export {
        router
    };