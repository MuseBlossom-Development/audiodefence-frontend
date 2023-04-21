<template>
    <the-loader v-if="showLoading"></the-loader>
    <b-container fluid>
        <b-row>
            <div>
            <b-nav align="center">
                <b-nav-item>
                    <Router-link class="nav-link" to="/">Home</Router-link>
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
                <b-nav-item v-if="!isAuthenticated" class="nav-item">
                    <Router-link class="nav-link" to="/login">로그인</Router-link>
                </b-nav-item>
                <b-nav-item v-if="!isAuthenticated" class="nav-item">
                    <Router-link class="nav-link" to="/signup">회원가입</Router-link>
                </b-nav-item>
            </b-nav>
        </div>
        </b-row>
        <Router-view/>
    </b-container>
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
        compatConfig: { MODE: 3 },
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
#app{
    font-family: "Gothic A1";
    font-weight:500;
    height : 100vh;
}
a{
    text-decoration:none !important;
    }
button+button{margin-left:5px;}
</style>