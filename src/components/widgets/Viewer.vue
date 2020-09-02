<template>
  <div class="hello">
    <el-row>
      <el-button-group>
        <el-button :type="getTypeButton('STL')" @click="showTab = 'STL'">STL</el-button>
        <el-button :type="getTypeButton('GCODE')" @click="showTab = 'GCODE'">GCode</el-button>
        <el-button :type="getTypeButton('REPO')" @click="showTab = 'REPO'">Profile Repository</el-button>
      </el-button-group>
    </el-row>
    <span v-if="showTab === 'STL'">
      <model-stl
        :src="fileAsDataUrl"
        :position="objectPosition"
        :camera-position="{x:0, y:-100, z:200}"
        ref="modelSTL"
        v-on:on-load="loaded"
      />
    </span>
    <span v-if="showTab === 'GCODE'">
      <model-gcode :src="fileGCodeAsDataUrl" ref="modelGCODE" v-on:on-load="loaded" />
    </span>
    <span v-if="showTab === 'REPO'">
      <repository />
    </span>
  </div>
</template>

<script>
import ModelGcode from "@/components/loaders/model-gcode";
import Repository from "@/components/widgets/Repository";
import { ModelStl } from "vue-3d-model";
import { Vector3, GridHelper, ArrowHelper, Box3 } from "three";

export default {
  name: "Viewer",
  components: { ModelGcode, ModelStl, Repository },
  props: {
    file: File,
    fileGCode: Blob,
    defaultProfiles: Array,
  },
  data: () => ({
    fileAsDataUrl: undefined,
    fileGCodeAsDataUrl: undefined,
    showTab: "STL",
    defaultProfilesRepo: undefined,
    objectPosition: {
      x: 0,
      y: 0,
      z: 0,
    },
  }),
  watch: {
    file: function (val) {
      if (val !== undefined) {
        /*
          Create a new FileReader object
        */
        let reader = new FileReader();
        reader.readAsDataURL(val);
        /*
          Add an event listener for when the file has been loaded
          to update the src on the file preview.
        */
        reader.addEventListener(
          "load",
          function () {
            this.fileAsDataUrl = reader.result;
            this.$refs.modelSTL.camera.lookAt(new Vector3());
            this.$refs.modelGCODE.camera.lookAt(new Vector3());
          }.bind(this),
          false
        );
      }
    },
    fileGCode: function (val) {
      if (val !== undefined) {
        var reader = new FileReader();

        reader.readAsDataURL(val);

        reader.addEventListener(
          "load",
          function () {
            this.fileGCodeAsDataUrl = reader.result;
            this.showTab = "GCODE";
          }.bind(this),
          false
        );
      }
    },
  },
  mounted() {},
  methods: {
    getTypeButton(value) {
      return this.showTab === value ? "primary" : "";
    },
    loaded() {
      var gridHelper = new GridHelper(200, 20, 0x0000ff, 0x808080);
      gridHelper.geometry.rotateX(Math.PI / 2);
      gridHelper.position.y = 100;
      gridHelper.position.x = 100;

      var dirX = new Vector3(1, 0, 0);
      var dirY = new Vector3(0, 1, 0);
      var dirZ = new Vector3(0, 0, 1);

      var origin = new Vector3(0, 0, 0);
      var length = 100;
      var hexX = 0xff0000;
      var hexY = 0x00ff00;
      var hexZ = 0x0000ff;

      var arrowHelperX = new ArrowHelper(dirX, origin, length, hexX);
      var arrowHelperY = new ArrowHelper(dirY, origin, length, hexY);

      var arrowHelperZ = new ArrowHelper(dirZ, origin, length, hexZ);

      var model;
      if (this.showTab === "STL") {
        model = this.$refs.modelSTL;
      } else if (this.showTab === "GCODE") {
        model = this.$refs.modelGCODE;
      }
      model.scene.add(gridHelper);
      model.scene.add(arrowHelperX);
      model.scene.add(arrowHelperY);
      model.scene.add(arrowHelperZ);
      model.camera.lookAt(new Vector3());
      var object = model.getObject();
      var geometry = object.geometry;
      geometry.computeBoundingBox();
      object.updateMatrixWorld();
      var box = new Box3().setFromObject(object).getSize(new Vector3());
      this.objectPosition = {
        x: 100,
        y: 100,
        z: 100 / 2,
      };
      console.log(box);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  height: calc(100% - 40px);
  width: 100%;
  outline: none;
}

.renderer {
  height: 100%;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.view-switch {
  position: fixed;
  bottom: 20px;
}
</style>
