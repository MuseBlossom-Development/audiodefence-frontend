<template>
    <Header/>
    <b-container>
        <b-row>
            <b-col class="p-3">
            <h1>워터마크 생성 및 다운로드</h1>
            </b-col>
            <Import/>
        </b-row>
    </b-container>
</template>
<script>
    import Header from "../components/Header.vue";
    import Import from "../views/Import.vue";
    export default {
        name: 'Download',
        components: {
            Header,
            Import
        }
    }
</script>