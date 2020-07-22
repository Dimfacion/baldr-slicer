<script>
import { GCodeLoader } from "three/examples/jsm/loaders/GCodeLoader";
import mixin from "vue-3d-model/src/model-mixin";

const suportWebGL = (() => {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
})();

const DEFAULT_GL_OPTIONS = {
  antialias: true,
  alpha: true,
};

export default {
  name: "model-gcode",
  mixins: [mixin],
  props: {
    lights: {
      type: Array,
      default() {
        return [
          {
            type: "AmbientLight",
            color: 0xaaaaaa
          },
          {
            type: "DirectionalLight",
            position: { x: 1, y: 1, z: 1 },
            color: 0xffffff,
            intensity: 0.8
          }
        ];
      }
    },
    gammaOutput: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loader : new GCodeLoader(),
      suportWebGL : suportWebGL
    }
  },
  methods: {
  }
};
</script>