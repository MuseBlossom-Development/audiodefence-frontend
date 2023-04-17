<template>
    <b-nav vertical>
        <b-nav-item>
            <Router-link to="/account">내 정보</Router-link>
        </b-nav-item>
        <b-nav-item>
            <Router-link to="/contactlist">수신처 목록</Router-link>
            <Router-link to="/links">활성 링크</Router-link>
        </b-nav-item>
        <b-nav-item>
            <Router-link to="/signatures">모든 서명</Router-link>
        </b-nav-item>
        <b-nav-item>
            <Router-link to="/activity">Activity</Router-link>
        </b-nav-item>
        <b-nav-item>
            <Router-link to="/price">가격 및 요금</Router-link>
        </b-nav-item>
    </b-nav>
</template>
<style lang="scss" scoped>
.nav{
    height: 100vh;border-right:1px solid rgb(182, 182, 182);
}
</style>