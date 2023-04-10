<template>
  <Nav/>
  <div id="main-wrapper">
    <Header/>
    <Router-view/>
    <Footer/>
  </div>
</template>
<script>
import Home from "./views/Home.vue";
import Nav from "./components/Nav.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
export default {
  name: 'App',
  components:{Home, Nav, Header, Footer}
}
</script>

<script>

</script>
<style>
#main-wrapper, .header{position:relative !important;padding-top:0 !important;}
.sidebar{top:60px !important;}
</style>