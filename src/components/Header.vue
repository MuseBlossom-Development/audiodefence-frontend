<template>
<div class="my-header">
    <b-navbar class="col-12">
        <b-navbar-brand to="/"><img src="../assets/images/Logo-w.png"/></b-navbar-brand>
        <b-navbar-nav>
        <b-nav-item>
            <Router-link class="nav-link" to="/dashboard">
                <div><img src="../assets/images/dashboard.png"></div>
                <p>Dashboard</p>
            </Router-link>
        </b-nav-item>
        <b-nav-item>
            <Router-link class="nav-link" to="/cloud">
                <div><img src="../assets/images/cloud.png"></div>
                <p>파일 저장소</p>
            </Router-link>
        </b-nav-item>
        <b-nav-item>
            <Router-link class="nav-link" to="/download">
                <div><img src="../assets/images/download.png"></div>
                <p>워터마크 생성 및 다운로드</p>
            </Router-link>
        </b-nav-item>
        <b-nav-item>
            <Router-link class="nav-link" to="/mail">
                <div><img src="../assets/images/email-link.png"></div>
                <p>이메일 발송</p>
            </Router-link>
        </b-nav-item>
        <b-nav-item>
            <Router-link class="nav-link" to="/detection">
                <div><img src="../assets/images/detection.png"></div>
                <p>워터마크 검증</p>
            </Router-link>
        </b-nav-item>
        </b-navbar-nav>
    </b-navbar>
</div>
</template>
<script>
</script>
<style lang="scss" scoped>
 .my-header{
        margin-top:105px;
        background:#0d6efd;
        box-shadow:0 15px 35px rgba(50,50,93,.1),0 5px 15px rgba(0,0,0,.07)!important; 
        .nav-item{
            text-align:center;
            width:25%;
        }
        .nav-link{
            color:#fff;
        }
 }
</style>