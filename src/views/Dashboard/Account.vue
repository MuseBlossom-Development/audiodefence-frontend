<template>
    <Sidebar/>
    <div class="content-body">
      <div class="container">
        <h1>This page is 내 정보</h1>
      </div>
    </div>
</template>
<script> 
import Sidebar from "../../components/Sidebar.vue";
export default {
  name: 'Account',
  components:{Sidebar}
}
</script>