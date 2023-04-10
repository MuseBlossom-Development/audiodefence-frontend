<template>
    <div class="authincation section-padding">
        <div class="container h-100">
            <div class="row justify-content-center h-100 align-items-center">
                <div class="col-xl-5 col-md-6">
                    <div class="mini-logo text-center my-4">
                        <h4 class="card-title mt-3">로그인</h4>
                    </div>
                    <div class="auth-form card">
                        <div class="card-body">
                            <form class="signin_validate row g-3" action="otp-2.html">
                                <div class="col-12">
                                    <input
                                        type="email"
                                        class="form-control"
                                        placeholder="이메일 주소 또는 아이디"
                                        name="email"/>
                                </div>
                                <div class="col-12">
                                    <input
                                        type="password"
                                        class="form-control"
                                        placeholder="비밀번호"
                                        name="password"/>
                                </div>
                                <div class="col-6">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                                        <label class="form-check-label" for="flexSwitchCheckDefault">아이디 기억하기</label >
                                    </div>
                                </div>
                                <div class="col-6 text-end">
                                    <Router-link class="item" :to="{name: 'Pwinquiry'}">비밀번호 찾기</Router-link>
                                </div>
                                <div class="text-center">
                                    <button type="submit" class="btn btn-primary btn-block">
                                       로그인
                                    </button>
                                </div>
                            </form>
                            <p class="mt-3 mb-0">
                                계정이 없으신가요?
                                <Router-link class="item" :to="{name: 'Signup'}">회원가입</Router-link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>