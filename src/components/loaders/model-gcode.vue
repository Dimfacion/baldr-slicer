<script>
import { GCodeLoader } from "three/examples/jsm/loaders/GCodeLoader";
import { WebGLRenderer } from "three";
import ModelMixin from "vue-3d-model/src/model-mixin";

export default {
  name: "model-gcode",
  mixins: [ModelMixin],
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
    const loader = new GCodeLoader();
    loader.setCrossOrigin(this.crossOrigin);
    return {
      loader
    };
  },
  methods: {
    load() {
      if (!this.src) return;
      if (this.object) {
        this.wrapper.remove(this.object);
      }
      this.loader.load(
        this.src,
        data => {
          this.addObject(data.scene);
          var renderer = new WebGLRenderer();
          renderer.setPixelRatio(window.devicePixelRatio);
          renderer.setSize(window.innerWidth, window.innerHeight);
          this.renderer.render(data.scene, data.camera);
        },
        xhr => {
          this.$emit("on-progress", xhr);
        },
        err => {
          this.$emit("on-error", err);
        }
      );
    }
  }
};
</script>