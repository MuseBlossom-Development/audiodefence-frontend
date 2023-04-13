<template>
    <Header/>
    <Sidebar/>
    <div class="content-body">
        <div class="container">
            <h1>This page is 가격 및 요금</h1>
        </div>
    </div>
</template>
<script>
    import Header from "../../components/Header.vue";
    import Sidebar from "../../components/Sidebar.vue";
    export default {
        components: {
            Sidebar,
            Header
        }
    }
</script>