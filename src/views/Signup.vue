<template>
    <div class="authincation section-padding">
        <div class="container h-100">
            <div class="row justify-content-center h-100 align-items-center">
                <div class="col-xl-5 col-md-6">
                    <div class="mini-logo text-center my-4">
                        <h4 class="card-title mt-3">회원가입</h4>
                    </div>
                    <div class="auth-form card">
                        <div class="card-body">
                            <div class="alert alert-danger" v-if="error">
                                {{ error }}
                            </div>
                            <form @submit.prevent="onSignup" class="signin_validate row g-3">
                                <div class="col-12">
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="이메일 주소"
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
                                <div class="col-12">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                                            <label class="form-check-label" for="flexSwitchCheckDefault">이용약관, 개인정보취급방침에 모두 동의합니다.</label>
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <button type="submit" class="btn btn-primary btn-block">가입하기</button>
                                    </div>
                                </form>
                                <div class="text-center">
                                    <p class="mt-3 mb-0">계정이 있으신가요?
                                        <Router-link class="item" to="/login">로그인</Router-link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <script>
        import SignupValidations from '../services/SignupValidations';
        import {mapActions, mapMutations} from 'vuex';
        import {LOADING_SPINNER_SHOW_MUTATION, SIGNUP_ACTION} from '../store/storeconstants';
        export default {
            data() {
                return {email: '', password: '', errors: [], error: ''};
            },
            beforeRouteLeave() {
                console.log('rote leaving');
                console.log(this.$store);
            },
            beforeRouteEnter(_, _1, next) {
                next((vm) => {
                    console.log('route entering');
                    console.log(vm.$store.state.auth);
                });
            },
            methods: {
                ...mapActions('auth', {signup: SIGNUP_ACTION}),
                ...mapMutations({showLoading: LOADING_SPINNER_SHOW_MUTATION}),
                async onSignup() {
                    let validations = new SignupValidations(this.email, this.password,);
                    this.errors = validations.checkValidations();
                    if ('email' in this.errors || 'password' in this.errors) {
                        return false;
                    }
                    //make spinner true
                    this.showLoading(true);
                    //signup registration
                    try {
                        await this.signup({email: this.email, password: this.password});
                    } catch (error) {
                        this.error = error;
                        this.showLoading(false);
                    }
                    this.showLoading(false);
                    //make spinner false
                }
            }
        };
    </script>