<template>
    <Sidebar/>
    <Header/>
    <div class="content-body">
        <router-view/>
    </div>
</template>
<script>
    import axiosInstance from '../services/AxiosTokenInstance';
    import {mapGetters, mapMutations} from 'vuex';
    import {GET_USER_TOKEN_GETTER, LOADING_SPINNER_SHOW_MUTATION} from '../store/storeconstants';
    import Sidebar from "../components/Sidebar.vue";
    import Header from "../components/Header.vue";

    export default {
        data() {
            return {dashbords: []};
        },
        computed: {
            ...mapGetters('auth', {token: GET_USER_TOKEN_GETTER})
        },
        mounted() {
          this.showLoading(true);
          axiosInstance
                .get(
                    `https://audio-defence-frontend-default-rtdb.firebaseio.com/dashbord.json`,
                )
                .then((response) => {
                    this.formatDashbord(response.data);
                    this.showLoading(false);
                }).catch(() => {
                this.showLoading(false);
            });
        },
        methods: {
          ...mapMutations({
            showLoading: LOADING_SPINNER_SHOW_MUTATION,
          }),
          formatDashbord(dashbords) {
                for (let key in dashbords) {
                    this
                        .dashbords
                        .push({
                            ...dashbords[key],
                            id: key
                        });
                }
                console.log(this.dashbords)

            }
        },
        name: 'Dashboard',
        components: {
            Sidebar,
            Header
        }
    };
</script>