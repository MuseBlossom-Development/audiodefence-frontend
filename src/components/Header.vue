<template>
    <div class="header">
        <div class="tabList">
            <a href="#" class="item on">Dashboard</a>
            <a href="#" class="item">워터마크 생성 및 링크 이메일 발송</a>
            <a href="#" class="item">워터마크 생성 및 다운로드</a>
            <a href="#" class="item">워터마크 검증</a>
        </div>
        <Nav/>
    </div>
</template>
<script>
    import Nav from "./Nav.vue";
    export default {components: {
            Nav
        }}
</script>
<style lang="scss" >
  .tabList{
    text-align:right;
    background:#fff;
  }
  .tabList, .topBar {
    max-width:1320px;
    a {
        padding: 10px;
        display: inline-block;
    }
    a.on{
      font-weight:bold;
    }
}
</style>