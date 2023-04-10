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
                            <form
                                method="post"
                                name="myform"
                                class="signin_validate row g-3"
                                action="/">
                                <div class="col-12">
                                    <input type="text" class="form-control" placeholder="아이디" name="name"></div>
                                    <div class="col-12">
                                        <input
                                            type="email"
                                            class="form-control"
                                            placeholder="이메일 주소"
                                            name="email"></div>
                                        <div class="col-12">
                                            <input
                                                type="password"
                                                class="form-control"
                                                placeholder="비밀번호"
                                                name="password"></div>
                                            <div class="col-12">
                                                <div class="form-check form-switch">
                                                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                                                        <label class="form-check-label" for="flexSwitchCheckDefault">이용약관, 개인정보취급방침에 모두 동의합니다.
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="text-center">
                                                    <button type="submit" class="btn btn-primary btn-block">가입하기</button>
                                                </div>
                                            </form>
                                            <div class="text-center">
                                                <p class="mt-3 mb-0">
                                                    <Router-link class="item" :to="{name: 'Login'}">로그인</Router-link>
                                                    to your account</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </template>