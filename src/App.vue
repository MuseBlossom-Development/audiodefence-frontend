<template>
    <the-loader v-if="showLoading"></the-loader>
    <div class="top-header">
            <b-nav align="center">
                <b-nav-item>
                    <Router-link class="nav-link" to="/"><img src="./assets/images/logo-width-w.png"></Router-link>
                </b-nav-item>
                <b-nav-item>
                    <Router-link class="nav-link" to="/about">About</Router-link>
                </b-nav-item>
                <b-nav-item>
                    <Router-link class="nav-link" to="/faq">FAQ</Router-link>
                </b-nav-item>
                <b-nav-item>
                    <Router-link class="nav-link" to="/contact">Contact</Router-link>
                </b-nav-item>
                <b-nav-item v-if="isAuthenticated" class="nav-item">
                    <Router-link class="nav-link" to="/dashboard">Dashboard</Router-link>
                </b-nav-item>
                <b-nav-item v-if="isAuthenticated" class="nav-item">
                    <b-button variant="primary" @click.prevent="onLogout">로그아웃</b-button>
                </b-nav-item>
                <!-- <b-nav-item v-if="!isAuthenticated" class="nav-item">
                    <Router-link class="nav-link" to="/login">로그인</Router-link>
                </b-nav-item>
                <b-nav-item v-if="!isAuthenticated" class="nav-item">
                    <Router-link class="nav-link" to="/signup">회원가입</Router-link>
                </b-nav-item> -->
            </b-nav>
    </div>
        <Router-view/>
</template>
<script>
    import {mapState} from 'vuex';
    import {mapActions, mapGetters} from 'vuex';
    import {AUTO_LOGIN_ACTION} from './store/storeconstants';
    import {defineAsyncComponent} from 'vue';
    import {IS_USER_AUTHENTICATE_GETTER, LOGOUT_ACTION} from './store/storeconstants';
    const TheLoader = defineAsyncComponent(
        () => import ('./components/TheLoader.vue'),
    );
    export default {
        compatConfig: {
            MODE: 3
        },
        name: 'App',
        computed: {
            ...mapState({
                showLoading: (state) => state.showLoading,
                autoLogout: (state) => state.auth.autoLogout
            }),
            ...mapGetters('auth', {isAuthenticated: IS_USER_AUTHENTICATE_GETTER})
        },
        watch: {
            autoLogout(curValue, oldValue) {
                if (curValue && curValue != oldValue) {
                    this
                        .$router
                        .replace('/login');
                }
            }
        },
        methods: {
            ...mapActions('auth', {logout: LOGOUT_ACTION}),
            onLogout() {
                this.logout();
                this
                    .$router
                    .replace('/login');
            }
        },
        components: {
            TheLoader
        },
        created() {
            this
                .$store
                .dispatch(`auth/${AUTO_LOGIN_ACTION}`);
        }
    };
</script>
<style lang="scss"> 
    #app {
        font-family: 'SCoreDream' !important;
        font-weight:400;        
        height: 100vh;

    }
    a {
        text-decoration: none !important;
    }
    button+button {
        margin-left: 5px;
    }
    .top-header{
        padding-top:.5rem!important;
        padding-bottom:.5rem!important;
        background:rgb(33 37 41 / 65%)
    }
    .top-header{  
        position:fixed;
        top:0;
        left:0;
        right:0;    
        box-shadow:0 15px 35px rgba(50,50,93,.1),0 5px 15px rgba(0,0,0,.07)!important; 
           
        .nav{
        display: flex;
        align-items: center;
        font-weight:500;
            .nav-link{
                color:#fff !important;
            }
        }
        
    }
    .content-body{padding:50px;}

</style>