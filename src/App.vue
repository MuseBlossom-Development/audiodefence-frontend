<template>
<the-loader v-if="showLoading"></the-loader>  
<div class="topBar">
  <ul class="nav justify-content-center">
  <li><Router-link class="nav-item" to="/">Home</Router-link></li>
  <li><Router-link class="nav-item" to="/about">About</Router-link></li>
  <li><Router-link class="nav-item" to="/faq">FAQ</Router-link></li>
  <li><Router-link class="nav-item" to="/contact">Contact</Router-link></li>
  <li v-if="isAuthenticated">
    <Router-link class="item" to="/dashboard">Dashboard</Router-link>
    <button @click.prevent="onLogout" class="btn btn-primary">로그아웃</button>
  </li>
  <li v-if="!isAuthenticated">
    <Router-link class="item" to="/login">로그인</Router-link>
    <Router-link class="item" to="/signup">회원가입</Router-link>
  </li>
  </ul>
</div>
  <div id="main-wrapper">
    <Router-view/>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { mapActions, mapGetters } from 'vuex';
import { AUTO_LOGIN_ACTION } from './store/storeconstants';
import { defineAsyncComponent } from 'vue';
import {
    IS_USER_AUTHENTICATE_GETTER,
    LOGOUT_ACTION,
} from './store/storeconstants';

const TheLoader = defineAsyncComponent(() =>
    import('./components/TheLoader.vue'),
);
export default {
    name: 'App',
    computed: {
        ...mapState({
            showLoading: (state) => state.showLoading,
            autoLogout: (state) => state.auth.autoLogout,
        }),
        ...mapGetters('auth', {
            isAuthenticated: IS_USER_AUTHENTICATE_GETTER,
        }),
    },
    watch: {
        autoLogout(curValue, oldValue) {
            if (curValue && curValue != oldValue) {
                this.$router.replace('/login');
            }
        },
    },
    methods: {
        ...mapActions('auth', {
            logout: LOGOUT_ACTION,
        }),
        onLogout() {
            this.logout();
            this.$router.replace('/login');
        },
    },
    components: {
        TheLoader,
    },
    created() {
        this.$store.dispatch(`auth/${AUTO_LOGIN_ACTION}`);
    },
};
</script>
<style lang="scss">
#main-wrapper, .header{position:relative !important;padding-top:0 !important;}
.sidebar{top:60px !important;}
.tabList{text-align:center;background:#fff;}
  .tabList, .topBar {max-width:1320px;
    a {padding: 10px;display: inline-block;}
    a.on{font-weight:bold;}
}
.topBar {margin: 0 auto;text-align: center;}
    ul {display: inline-block;
        li {display: inherit;}
    }
.error{padding:10px;color:red;}
</style>