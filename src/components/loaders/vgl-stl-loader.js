 
import { OBJLoader2Parallel } from 'three/examples/jsm/loaders/OBJLoader2Parallel';
import { Object3D } from 'three';
import { VglObject3d } from 'vue-gl';

export default {
  mixins: [VglObject3d],
  props: {
    src: String,
  },
  computed: {
    inst() {
      const object = new Object3D();
      const loader = new OBJLoader2Parallel();
      loader.setBaseObject3d(object);
      loader.load(this.src, () => { this.vglObject3d.emit(); });
      return object;
    },
  },
};