<template>
  <div class="hello">
    <form action="http://localhost:3000/upload" method="post" enctype="multipart/form-data">
      <input name="foo" type="file" />
      <input type="submit" value="Sending !" />
    </form>

    <model-gcode src="stl/CE5_fox.gcode"></model-gcode>
  </div>
</template>

<script>
import ModelGcode from "@/components/loaders/model-gcode";

export default {
  name: "Viewer",
  props: {
    msg: String
  },
  components: { ModelGcode },
  data: () => ({
    fov: 50,
    zoom: 1,
    intensity: 0.5,
    r: 255,
    b: 255,
    g: 255,
    gr: 127,
    gb: 127,
    gg: 127
  })
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
