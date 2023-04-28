<template>
    <b-container fluid class="shape-container d-flex align-items-center py-lg">
        <b-row class="text-center">
            <b-col>
                <h1 class="text-white">AUDIO DEFENCE</h1>
                <p class="text-white">상업용 음반을 포함한 콘텐츠 보호용 오디오 워터마크 시스템 AUDIO DEFENCE는<br/>음원 콘텐츠에 들리지 않는 메시지를 삽입하고 검증하는
                    서비스입니다.</p>
                <p class="text-white">이제 오디오콘텐츠에 저작권 보호 필수템 오디오디펜스가 지켜드립니다.</p>
                <div class="button-group">
                    <b-button variant="primary" size="lg" class="btn mr-2"><Router-link class="nav-link" to="/login">로그인</Router-link></b-button>
                    <b-button variant="dark" size="lg" class="btn"><Router-link class="nav-link" to="/signup">회원가입</Router-link></b-button>
                        </div>
            </b-col>
        </b-row>
    </b-container>
</template>
<style scoped="scoped">
    .container-fluid {
        background: url("../assets/images/bg13.jpg") center bottom;
        background-size: 100% 100%;
        height: 100vh;
    }
    h1{
        font-size:50px;
        font-weight:500;
        padding-bottom:1.5rem!important
    }
    p{
        font-size:19px;
        font-weight:500;
    }
    button{
        padding:15px 50px;
        font-size:15px;
        font-weight:400;
        
        border:none;
        }
    .row{
        margin:0 auto;
        padding:60px 100px 50px;
        border-radius: 30px;
        background:rgb(0 0 0 / 58%);
        box-shadow:0 15px 35px rgba(0, 0, 24, 0.1),0 5px 15px rgba(0,0,0,.07)
    }
    .button-group{
        margin-top:50px;
    }
</style>