<template>
  <div class="hello">
    <span v-if="!showGCode">
      <model-stl :src="fileAsDataUrl" />
    </span>
    <span v-if="showGCode">
      <model-gcode :src="fileGCodeAsDataUrl" />
    </span>
    <el-switch
      class="view-switch"
      v-model="showGCode"
      active-text="GCode"
      inactive-text="STL">
    </el-switch>
  </div>
</template>

<script>
import ModelGcode from "@/components/loaders/model-gcode";
import { ModelStl } from 'vue-3d-model';

export default {
  name: "Viewer",
  components: { ModelGcode, ModelStl },
  props: {
    file: File,
    fileGCode: Blob
  },
  data: () => ({
    fileAsDataUrl: undefined,
    fileGCodeAsDataUrl: undefined,
    showGCode: false
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
          this.showGCode = true;
        }.bind(this), false);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  height: 100%;
  width: 100%;
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
