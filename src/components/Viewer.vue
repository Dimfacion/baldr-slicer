<template>
  <div class="hello">
    <vgl-renderer antialias class="renderer" shadow-map-enabled scene="main-scene" camera="main-camera">
      <vgl-scene background-color="lightgrey" fog="#000000 10 50" name="main-scene">
        <vgl-stl-loader src="/stl/seahorse.obj" />
        <vgl-ambient-light intensity="0.5" />
        <vgl-directional-light position="1 1 1" intensity="0.5" />
      </vgl-scene>
      <vgl-perspective-camera orbit-position="20 1 1" :fov="fov" :zoom="zoom" name="main-camera" />
    </vgl-renderer>
  </div>
</template>

<script>
import {
  VglRenderer,
  VglPerspectiveCamera,
  VglMesh,
  VglScene,
  VglBoxGeometry,
  VglHemisphereLight,
  VglDirectionalLight,
  VglAmbientLight,
  VglMeshStandardMaterial,
} from "vue-gl";

const VglStlLoader = require('@/components/loaders/vgl-stl-loader')

export default {
  name: "Viewer",
  props: {
    msg: String,
  },
  components: {
    VglRenderer,
    VglPerspectiveCamera,
    VglMesh,
    VglScene,
    VglBoxGeometry,
    VglHemisphereLight,
    VglDirectionalLight,
    VglAmbientLight,
    VglMeshStandardMaterial,
    VglStlLoader
  },
  data: () => ({
    fov: 50,
    zoom: 1,
    intensity: 0.5,
    r: 255,
    b: 255,
    g: 255,
    gr: 127,
    gb: 127,
    gg: 127,
  }),
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
</style>
