<template>
    <b-container
        fluid="fluid"
        class="shape-container d-flex align-items-center py-lg">
        <b-row class="col-12 text-center">
            <div class="content-body">
                <div class="container h-100">
                    <div class="row justify-content-center h-100 align-items-center">
                        <div class="col-xl-5 col-md-6">
                            <div class="mini-logo text-center my-4">
                                <h4 class="card-title mt-3">로그인</h4>
                            </div>
                            <div class="auth-form card">
                                <div class="card-body">
                                    <div class="alert alert-danger" v-if="error">
                                        {{ error }}
                                    </div>
                                    <form @submit.prevent="onLogin" class="signin_validate row g-3">
                                        <div class="col-12">
                                            <input
                                                type="email"
                                                class="form-control"
                                                placeholder="이메일 주소 또는 아이디"
                                                v-model.trim="email"/>
                                            <div class="error" v-if="errors.email">
                                                {{ errors.email }}
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <input
                                                type="password"
                                                class="form-control"
                                                placeholder="비밀번호"
                                                v-model.trim="password"/>
                                            <div class="error" v-if="errors.password">
                                                {{ errors.password }}
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                                                <label class="form-check-label" for="flexSwitchCheckDefault">아이디 기억하기</label >
                                            </div>
                                        </div>
                                        <div class="col-6 text-end">
                                            <Router-link class="item" to="/pwinquiry">비밀번호 찾기</Router-link>
                                        </div>
                                        <div class="text-center">
                                            <button type="submit" class="btn btn-primary btn-block">
                                                로그인
                                            </button>
                                        </div>
                                    </form>
                                    <p class="mt-3 mb-0">
                                        계정이 없으신가요?
                                        <Router-link class="item" to="/signup">회원가입</Router-link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </b-row>
    </b-container>
</template>
<script>
    import {mapActions, mapMutations} from 'vuex';
    import SignupValidations from '../services/SignupValidations';
    import {LOADING_SPINNER_SHOW_MUTATION, LOGIN_ACTION} from '../store/storeconstants';
    export default {
        data() {
            return {email: '', password: '', errors: [], error: ''};
        },
        methods: {
            ...mapActions('auth', {login: LOGIN_ACTION}),
            ...mapMutations({showLoading: LOADING_SPINNER_SHOW_MUTATION}),
            async onLogin() {
                let validations = new SignupValidations(this.email, this.password,);
                this.errors = validations.checkValidations();
                if (this.errors.length) {
                    return false;
                }
                this.error = '';
                this.showLoading(true);
                //Login check
                try {
                    await this.login({email: this.email, password: this.password});
                } catch (e) {
                    this.error = e;
                    this.showLoading(false);
                }
                this.showLoading(false);
                this
                    .$router
                    .push('/dashboard');
            }
        }
    };
</script>
<style scoped>
.row{
        margin:3% auto;
    }
</style>