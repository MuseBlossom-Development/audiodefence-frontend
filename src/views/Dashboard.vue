<template>
    <Sidebar/>
    <div class="content-body">
        <router-view/>
    </div>
</template>
<script> 

import Sidebar from "../components/Sidebar.vue";
export default {
  name: 'Dashboard',
  components:{Sidebar}
}
</script>