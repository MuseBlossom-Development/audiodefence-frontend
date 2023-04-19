<template>
    <Header/>
    <h1>워터마크 생성 및 다운로드</h1>
    <Import/>
</template>
<script>
    import Header from "../components/Header.vue";
    import Import from "../views/Import.vue";
    export default {
        name: 'Download',
        components: {
            Header,
            Import,
        },
    }
</script>