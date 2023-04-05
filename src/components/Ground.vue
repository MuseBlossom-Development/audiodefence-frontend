<template>
  <div class="ground">
    <Header/>
    <Body/>
    <Footer/>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Body from "./Body.vue";
import Footer from "./Footer.vue";
export default {
  components:{Header, Body, Footer}

}
</script>
<style>
*{margin:0;padding:0;}
header, footer{padding:10px;text-align:center;background:#ededed;border-bottom:1px solid #d4d4d4;}
</style>