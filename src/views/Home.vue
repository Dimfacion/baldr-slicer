<template>
  <div
    v-cloak
    id="app"
    @drop.prevent="addFile"
    @dragover.prevent
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
      <el-tooltip class="item" effect="dark" content="Settings" placement="top" :open-delay="200">
        <el-button
          class="config"
          type="primary"
          icon="el-icon-s-tools"
          circle
          @click="drawer = !drawer"
        />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="Slice" placement="top" :open-delay="200">
      <el-button
        class="slice"
        type="primary"
        icon="el-icon-magic-stick"
        circle
        tooltip="Slice"
        :disabled="file === undefined"
        @click="submit"
      />
      </el-tooltip>
      <el-drawer
        title="Config"
        :visible.sync="drawer"
        direction="ltr"
        custom-class="drawer"
        size="30%"
      >
        <el-table>
          <el-table-column
            label="Name"
            width="180"
          />
        </el-table>
      </el-drawer>
      <Viewer :file="file" :fileGCode="fileGCode" />

      <form
        ref="form"
        action="http://localhost:3000/upload"
        method="post"
        enctype="multipart/form-data"
        class="hide"
      >
        <input
          ref="file"
          name="foo"
          type="file"
        >
      </form>
  </div>
</template>

<script>

import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// @ is an alias to /src
import Viewer from '@/components/widgets/Viewer.vue'
import BaldrApi from '@/components/services/baldrApi.services'

Vue.use(ElementUI);

export default {
  name: 'Home',
  components: {
    Viewer
  },
  data() {
    return {
      drawer: false,
      file: undefined,
      fileGCode: undefined,
      loading: false
    };
  },
  methods: {
    addFile(e) {
      let droppedFiles = e.dataTransfer.files;
      if(!droppedFiles) return;
      // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
      ([...droppedFiles]).forEach(f => {
        this.file = f;
      });
      this.$refs.file.files = droppedFiles;
    },
    submit() {
      this.loading = true;
      BaldrApi.slice(this.$refs.file.files).then(re => re.blob())
      .then(blob => {
        this.fileGCode = blob;
        this.loading = false;
      });
    }
  }
}
</script>

<style scoped lang="scss">
.config {
  position: fixed;
  left: 20px;
  top: 20px;
}
.slice {
  position: fixed;
  left: 60px;
  top: 20px;
}
.hide {
  display: none;
}
</style>
