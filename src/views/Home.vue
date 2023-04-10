<template>
  <Nav/>
  <div id="main-wrapper">
    <Header/>
    <RouterView/>
    <Footer/>
  </div>
</template>
<script>
import Nav from "../components/Nav.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
export default {
  name: 'Home',
  components:{Nav, Header, Footer}
}
</script>
<style>
#main-wrapper, .header{position:relative !important;padding-top:0 !important;}
.sidebar{top:60px !important;}
</style>