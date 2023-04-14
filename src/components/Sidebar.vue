<template>
    <div class="sidebar">
        <div class="brand-logo">
            <Router-link class="item" to="/"><img src="../assets/images/logo.png" alt=""/></Router-link>
            <a href="index.html"></a>
        </div>
        <div class="menu">
            <ul>
                <li>
                    <Router-link class="item" to="account">내 정보</Router-link>
                </li>
                <li>
                    <Router-link class="item" to="contactlist">수신처 목록</Router-link>
                </li>
                <li>
                    <Router-link class="item" to="links">활성 링크</Router-link>
                </li>
                <li>
                    <Router-link class="item" to="signatures">모든 서명</Router-link>
                </li>
                <li>
                    <Router-link class="item" to="activity">Activity</Router-link>
                </li>
                <li>
                    <Router-link class="item" to="price">가격 및 요금</Router-link>
                </li>
            </ul>
        </div>
    </div>
</template>