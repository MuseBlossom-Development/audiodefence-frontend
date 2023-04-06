<template>
  <div id="main-wrapper">
    <Header/>
    <Sidebar/>
    <Body/>
    <Footer/>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Sidebar from "./Sidebar.vue";
import Body from "./Body.vue";
import Footer from "./Footer.vue";
export default {
  components:{Header, Sidebar, Body, Footer}
}
</script>