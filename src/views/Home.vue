<template>
  <div
    v-cloak
    id="app"
    @drop.prevent="addFile"
    @dragover.prevent
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <splash :visible="splashScreenVisible" />
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
      <el-dropdown class="sliceDropDown" placement="bottom" @command="submit">
        <el-button
          class="slice"
          type="primary"
          icon="el-icon-magic-stick"
          circle
          :disabled="file === undefined"
        />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="prusaslicer">Slice using PrusaSlicer</el-dropdown-item>
          <el-dropdown-item command="slic3r">Slice using Slic3r</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="Load" placement="top" :open-delay="200">
      <el-button
        class="load-button"
        type="primary"
        icon="el-icon-folder-opened"
        circle
        tooltip="Slice"
        @click="openInputFile"
      />
    </el-tooltip>
    <el-drawer
      title="Config"
      :visible.sync="drawer"
      direction="rtl"
      custom-class="drawer"
      size="30%"
      :modal="false"
      :modal-append-to-body="false"
    >
      <el-table>
        <el-table-column label="Name" width="180" />
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
      <input ref="file" name="foo" type="file" />
    </form>
    <input ref="stlFileLoader" name="foo" type="file" class="hide" @change="addFileButton" />
  </div>
</template>

<script>
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// @ is an alias to /src
import Viewer from "@/components/widgets/Viewer.vue";
import BaldrApi from "@/components/services/baldrApi.services";
import Splash from "@/components/widgets/Splash";

Vue.use(ElementUI);

export default {
  name: "Home",
  components: {
    Viewer,
    Splash,
  },
  data() {
    return {
      drawer: false,
      file: undefined,
      fileGCode: undefined,
      loading: false,
      splashScreenVisible: true,
    };
  },
  mounted: function () {
    setTimeout(() => {
      this.splashScreenVisible = false;
    }, 2000);
  },
  methods: {
    addFile(e) {
      let droppedFiles = e.dataTransfer.files;
      if (!droppedFiles) return;
      // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
      [...droppedFiles].forEach((f) => {
        this.file = f;
      });
      this.$refs.file.files = droppedFiles;
    },
    addFileButton(e) {
      let droppedFiles = e.target.files;
      if (!droppedFiles) return;
      // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
      [...droppedFiles].forEach((f) => {
        this.file = f;
      });
      this.$refs.file.files = droppedFiles;
    },
    submit(type) {
      this.loading = true;
      BaldrApi.slice(this.$refs.file.files, type)
        .then((re) => re.blob())
        .then((blob) => {
          this.fileGCode = blob;
          this.loading = false;
        });
    },
    openInputFile() {
      this.$refs.stlFileLoader.click();
    },
  },
};
</script>

<style scoped lang="scss">
.config {
  position: fixed;
  right: 20px;
  bottom: 20px;
}
.slice {
  position: fixed;
  right: 80px;
  bottom: 20px;
}
.sliceDropDown {
  position: fixed;
  right: 80px;
  bottom: 120px;
}
.load-button {
  position: fixed;
  right: 140px;
  bottom: 20px;
}
.hide {
  display: none;
}
</style>
