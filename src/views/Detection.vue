<template>
    <Sidebar/>
    <Header/>
    <div class="content-body">
        <div class="container">
            <h1>워터마크 검증</h1>
        </div>
    </div>
</template>
<script> 
import Sidebar from "../components/Sidebar.vue";
import Header from "../components/Header.vue";
export default {
  name: 'Detection',
  components:{Sidebar, Header}
}
</script>