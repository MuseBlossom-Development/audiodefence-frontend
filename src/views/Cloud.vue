<template>
    <Sidebar/>
    <Header/>
    <div class="content-body">
        <div class="container">
            <h1>워터마크 생성 및 파일 저장소</h1>
        </div>
    </div>
</template>
<script> 
import Sidebar from "../components/Sidebar.vue";
import Header from "../components/Header.vue";
export default {
  name: 'Cloud',
  components:{Sidebar, Header}
}
</script>