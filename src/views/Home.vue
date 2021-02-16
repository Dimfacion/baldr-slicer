<template>
  <div id="app" @drop.prevent="addFile" @dragover.prevent>
    <b-overlay :show="loading" class="all-height" rounded="sm">
      <b-container fluid>
        <b-row align-content="right" class="text-right">
          <b-col class="tools-button">
            <b-button
              v-b-tooltip.hover
              title="Load"
              class="load-button"
              variant="primary"
              icon="b-icon-folder-opened"
              circle
              tooltip="Load"
              @click="openInputFile"
              ><b-icon icon="folder"></b-icon
            ></b-button>
            <b-button
              v-b-tooltip.hover
              title="Profile Repository"
              class="load-button"
              variant="primary"
              circle
              tooltip="Profile Repository"
              v-b-toggle.sidebar-repo
              ><b-icon icon="search"></b-icon
            ></b-button>
            <b-button
              v-b-tooltip.hover
              title="Settings"
              class="config"
              variant="primary"
              icon="b-icon-s-tools"
              circle
              v-b-toggle.sidebar-config
              ><b-icon icon="gear"></b-icon
            ></b-button>
            <b-button
              v-b-tooltip.hover
              title="Slice"
              class="slice"
              variant="primary"
              icon="b-icon-magic-stick"
              circle
              @click="submit"
              :disabled="file === undefined"
              ><b-icon icon="bar-chart-steps"></b-icon
            ></b-button>
          </b-col>
          <b-col cols="2" lg="auto" class="slicer-button">
            <b-card class="text-center">
              <b-form-group
                label="Slicer :"
                label-for="sliceengine"
              >
                <b-form-select id="sliceengine" v-model="type">
                  <b-form-select-option value="prusaslicer"
                    >PrusaSlicer</b-form-select-option
                  >
                  <b-form-select-option value="curaengine"
                    >CuraEngine</b-form-select-option
                  >
                  <b-form-select-option value="slic3r"
                    >Slic3r</b-form-select-option
                  >
                </b-form-select>
              </b-form-group>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
      <b-sidebar title="Config" id="sidebar-config" right shadow>
        <b-table>
          <b-table-column label="Name" width="180" />
        </b-table>
      </b-sidebar>

      <b-sidebar
        title="Profile Repository"
        id="sidebar-repo"
        width="100%"
        right
        shadow
      >
        <repository />
      </b-sidebar>
      <Viewer :file="file" :fileGCode="fileGCode" />
    </b-overlay>
    <form
      ref="form"
      action="http://localhost:3000/upload"
      method="post"
      enctype="multipart/form-data"
      class="hide"
    >
      <input ref="file" name="foo" type="file" />
    </form>
    <input
      ref="stlFileLoader"
      name="foo"
      type="file"
      class="hide"
      @change="addFileButton"
    />
  </div>
</template>

<script>
import Vue from "vue";
// @ is an alias to /src
import Viewer from "@/components/widgets/Viewer.vue";
import BaldrApi from "@/components/services/baldrApi.services";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

export default {
  name: "Home",
  components: {
    Viewer,
  },
  data() {
    return {
      drawer: false,
      file: undefined,
      fileGCode: undefined,
      loading: false,
      splashScreenVisible: true,
      type: "prusaslicer",
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
    submit() {
      this.loading = true;
      BaldrApi.slice(this.$refs.file.files, this.type)
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
.hide {
  display: none;
}

.all-height {
  height: 100%;
}

.tools-button {
  position: fixed;
  bottom: 20px;
  right: 10px;
}

.slicer-button {
  position: fixed;
  top: 20px;
  right: 10px;
}
</style>
