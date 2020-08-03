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
      <model-stl :src="fileAsDataUrl" />
    </span>
    <span v-if="showTab === 'GCODE'">
      <model-gcode :src="fileGCodeAsDataUrl" />
    </span>
    <span v-if="showTab === 'REPO'">
      <repository />
    </span>
  </div>
</template>

<script>
import ModelGcode from "@/components/loaders/model-gcode";
import Repository from "@/components/widgets/Repository";
import { ModelStl } from 'vue-3d-model';

export default {
  name: "Viewer",
  components: { ModelGcode, ModelStl, Repository },
  props: {
    file: File,
    fileGCode: Blob,
    defaultProfiles: Array
  },
  data: () => ({
    fileAsDataUrl: undefined,
    fileGCodeAsDataUrl: undefined,
    showTab: 'STL',
    defaultProfilesRepo: undefined
  }),
  watch: {
    file: function(val) {
      if(val !== undefined) {
        /*
          Create a new FileReader object
        */
        let reader = new FileReader();
        reader.readAsDataURL( val );
        /*
          Add an event listener for when the file has been loaded
          to update the src on the file preview.
        */
        reader.addEventListener("load", function(){
          this.fileAsDataUrl = reader.result;
        }.bind(this), false);
      }
    },
    fileGCode: function(val) {
      if(val !== undefined) {
        var reader = new FileReader();
        
        reader.readAsDataURL(val);

        reader.addEventListener("load", function(){
          this.fileGCodeAsDataUrl = reader.result;
          this.showTab = "GCODE";
        }.bind(this), false);
      }
    }
  },
  methods: {
    getTypeButton(value) {
      return (this.showTab === value ? 'primary' : '');
    }
  }
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
