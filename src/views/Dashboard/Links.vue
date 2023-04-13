<template>
  <Header/>
  <Sidebar/>
  <div class="content-body">
    <div class="container">
      <h1>This page is 활성 링크</h1>
    </div>
  </div>
</template> 
<script> 
import Header from "../../components/Header.vue";
import Sidebar from "../../components/Sidebar.vue";
  export default {
    name: 'Links',
    components:{Sidebar, Header}
  }
  </script>