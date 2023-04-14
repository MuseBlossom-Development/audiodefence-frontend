<template>
    <div class="sidebar">
        <div class="brand-logo">
            <Router-link class="item" to="/"><img src="../assets/images/logo.png" alt=""/></Router-link>
            <a href="index.html"></a>
        </div>
        <div class="menu">
            <ul class="nav flex-column">
                <li>
                    <Router-link class="nav-link" to="/account">내 정보</Router-link>
                </li>
                <li>
                    <Router-link class="nav-link" to="/contactlist">수신처 목록</Router-link>
                </li>
                <li>
                    <Router-link class="nav-link" to="/links">활성 링크</Router-link>
                </li>
                <li>
                    <Router-link class="nav-link" to="/signatures">모든 서명</Router-link>
                </li>
                <li>
                    <Router-link class="nav-link" to="/activity">Activity</Router-link>
                </li>
                <li>
                    <Router-link class="nav-link" to="/price">가격 및 요금</Router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="scss" scoped>
ul{
    width:100%;
    li{
        display:block;
        text-align:left;
        a{
            display:block;
            width:100%;
        }
    
    }
}
</style>