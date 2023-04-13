<!-- <template>
    <div class="topBar">
        <ul>
            <li>
                <Router-link class="item" :to="{name: 'Home'}">Home</Router-link>
            </li>
            <li>
                <Router-link class="item" :to="{name: 'About'}">About</Router-link>
            </li>
            <li>
                <Router-link class="item" :to="{name: 'FAQ'}">FAQ</Router-link>
            </li>
            <li>
                <Router-link class="item" :to="{name: 'Contact'}">Contact</Router-link>
            </li>
            <li v-if="state.account.mid">
                반갑습니다, <Router-link class="item" :to="{name: 'Dashboard'}">{{ state.account.memberName }}</Router-link>님!
            </li>
            <li v-else>
                <Router-link class="item" :to="{name: 'Login'}">로그인</Router-link>
                <Router-link class="item" :to="{name: 'Signup'}">회원가입</Router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    import axios from "axios";
    import {reactive} from 'vue';
    export default {
        setup() {
            const state = reactive({
                account: {
                    mid: null,
                    memberName: ""
                },
                form:{
                  loginId:"";
                  loginPw:
                }
            });
            axios
                .get("/api/account")
                .then((res) => {
                    state.account = res.data;
                });
            return {state}
        }
    }
</script>
<style lang="scss" scoped="scoped">
    .topBar {
        margin: 0 auto;
        text-align: center;
    }
    ul {
        display: inline-block;
        li {
            display: inherit;
        }
    }
</style> -->