<template>
  <div id="app">
    <el-button @click="drawer = !drawer" class="config" type="primary" icon="el-icon-s-tools" circle></el-button>
    <el-drawer
      title="Config"
      :visible.sync="drawer"
      direction="ltr"
      custom-class="drawer"
      size="30%"
    >
      <el-table>
        <el-table-column label="Name" width="180"></el-table-column>
      </el-table>
    </el-drawer>
    <Viewer/>
  </div>
</template>

<script>

import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// @ is an alias to /src
import Viewer from '@/components/Viewer.vue'

Vue.use(ElementUI);

export default {
  name: 'home',
  data() {
    return {
      drawer: false
    };
  },
  components: {
    Viewer
  }
}
</script>

<style scoped lang="scss">
.config {
  position: fixed;
  left: 20px;
  top: 20px;
}
</style>
