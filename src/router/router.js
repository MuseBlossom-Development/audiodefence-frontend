import {createRouter, createWebHistory} from 'vue-router';
import store from '../store/store';
import {IS_USER_AUTHENTICATE_GETTER} from '../store/storeconstants';

const Home = () => import ('../views/Home.vue');
const Login = () => import ('../views/Login.vue');
const Signup = () => import ('../views/Signup.vue');
const Pwinquiry = () => import ('../views/Pwinquiry.vue');
const About = () => import ('../views/About.vue');
const Faq = () => import ('../views/FAQ.vue');
const Contact = () => import ('../views/Contact.vue');
const Dashboard = () => import ('../views/Dashboard.vue');
const Mail = () => import ('../views/Mail.vue');
const Download = () => import ('../views/Download.vue');
const Cloud = () => import ('../views/Cloud.vue');
const Detection = () => import ('../views/Detection.vue');
// const Account = () => import ('../views/dashboard/Account.vue');
// const Contactlist = () => import ('../views/dashboard/Contactlist.vue');
// const Links = () => import ('../views/dashboard/Links.vue');
// const Signatures = () => import ('../views/dashboard/Signatures.vue');
// const Activity = () => import ('../views/dashboard/Activity.vue');
// const Price = () => import ('../views/dashboard/Price.vue');

const routes = [
    {path: '/', component: Home }, 
    {path: '/login', component: Login, meta: { auth: false } }, 
    {path: '/signup', component: Signup, meta: { auth: false } }, 
    {path: '/pwinquiry', component: Pwinquiry, meta: { auth: false } }, 
    {path: '/about', component: About }, 
    {path: '/faq', component: Faq }, 
    {path: '/contact', component: Contact }, 
    {path: '/dashboard', component: Dashboard, meta: { auth: true } }, 
    {path: '/mail', component: Mail, meta: { auth: true } }, 
    {path: '/download', component: Download, meta: { auth: true } }, 
    {path: '/cloud', component: Cloud, meta: { auth: true } }, 
    {path: '/detection', component: Detection, meta: { auth: true } }, 
    // {path: '/account', component: Account, meta: { auth: true } }, 
    // {path: '/contactlist', component: Contactlist, meta: { auth: true } }, 
    // {path: '/links', component: Links, meta: { auth: true } }, 
    // {path: '/signatures', component: Signatures, meta: { auth: true } }, 
    // {path: '/activity', component: Activity, meta: { auth: true } }, 
    // {path: '/price', component: Price, meta: { auth: true } } 
];

// 라우터 생성
const router = createRouter({
    history: createWebHistory(),
    routes,
});


router.beforeEach((to, from, next) => {
    if (
        'auth' in to.meta &&
        to.meta.auth &&
        !store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]
    ) {
        next('/login');
    } else if (
        'auth' in to.meta &&
        !to.meta.auth &&
        store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]
    ) {
        next('/dashboard');
    } else {
        next();
    }
});

// 라우터 추출 (main.js에서 import)
export {
    router
};