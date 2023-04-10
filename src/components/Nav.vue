<template>
    <div class="topBar">
        <Router-link class="item" :to="{name: 'Home'}">Home</Router-link>
        <Router-link class="item" :to="{name: 'About'}">About</Router-link>
        <Router-link class="item" :to="{name: 'FAQ'}">FAQ</Router-link>
        <Router-link class="item" :to="{name: 'Contact'}">Contact</Router-link>
        <Router-link class="item" :to="{name: 'Login'}">로그인</Router-link>
        <Router-link class="item" :to="{name: 'Signup'}">회원가입</Router-link>
    </div>
</template>