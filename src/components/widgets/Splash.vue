<template>
  <transition name="el-fade-in"s>
  <div class="splash" v-show="visible">
    <p>
      <el-image
        class="logo"
        :src="asset"
        fit="contain">
      </el-image>
    </p>
    <h1>
      BALDR SLICER
    </h1>
  </div>
  </transition>
</template>

<script>
const asset = require('@/assets/Baldur.jpg')

export default {
  name: "Splash",
  components: {  },
  props: {
    visible: Boolean
  },
  data: () => ({
    asset
  }),
  methods: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.splash {
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 999999;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.8);
  font-family: 'Skranji', cursive;
}

.logo {
  top: 15%;
  height: 400px;
}
</style>
