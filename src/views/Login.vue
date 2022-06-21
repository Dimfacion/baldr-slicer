<template>
  <transition name="el-fade-in">
    <div class="splash">
      <b-container fluid>
        <b-row align-h="center" class="mt-1">
          <b-img class="logo" :src="asset" fit="contain"></b-img>
        </b-row>
        <b-row align-h="center" class="mt-1">
          <h1>BALDR SLICER</h1>
        </b-row>
        <b-row class="beta" align-h="center">
          <h2>ALPHA VERSION</h2>
        </b-row>
        <b-row class="beta" align-h="center">
          <p>You should know that the state of this app is not viable yet.</p>
        </b-row>
        <b-row class="beta" align-h="center">
          <p>
            Please, bear in mind that NO gcode from this app should be used
            without proper supervision.
          </p>
        </b-row>
        <b-row class="beta" align-h="center">
          <p>
            I cannot be held responsible for any damage that might come from
            using this app.
          </p>
        </b-row>
        <b-row align-h="center" class="mt-1">Login</b-row>
        <b-row align-h="center" class="mt-1">
          <input type="text" />
        </b-row>
        <b-row align-h="center" class="mt-1">Password</b-row>
        <b-row align-h="center" class="mt-1">
          <input type="text" />
        </b-row>
        <b-row align-h="center" class="mt-2">
          <b-col :cols="2">
            <b-button variant="primary" style="width: 100%" @click="goToHome()">
              <b-icon icon="key"></b-icon>&nbsp;Login</b-button
            >
          </b-col>
          <b-col :cols="2">
            <b-button variant="primary" style="width: 100%" disabled
              ><b-icon icon="person"></b-icon>&nbsp;Create an account</b-button
            >
          </b-col>
        </b-row>
        <b-row align-h="center" class="mt-1">
          <b-link type="primary" disabled>I forgot my password</b-link>
        </b-row>
        <b-row
          type="flex"
          align-h="center"
          class="row-bg mt-3"
          justify="center"
        >
          <!-- Button to login with google ui rendered using the renderParams object 
        // The rendered button can't be use to logout since it is rendered by the google api and will only login 
          // If you add the logoutButton param to true it will show a normal button without styles-->
          <GoogleLogin
            :span="6"
            :params="params"
            :renderParams="renderParams"
            :onSuccess="onSuccess"
            :onFailure="onFailure"
          ></GoogleLogin>
        </b-row>
      </b-container>
    </div>
  </transition>
</template>

<script>
import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import GoogleLogin from "vue-google-login";
import Store from "../components/store";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
const asset = require("@/assets/Baldur.jpg");

export default {
  name: "Login",
  components: {
    GoogleLogin,
  },
  data: () => ({
    asset,
    // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
    params: {
      client_id:
        "363920284035-ogo0scmrl8a1oi8jtn3a9pcfdcm5etg2.apps.googleusercontent.com",
    },
    // only needed if you want to render the button with the google ui
    renderParams: {
      width: 250,
      height: 50,
      longtitle: true,
    },
  }),
  methods: {
    onSuccess(googleUser) {
      // This only gets the user information: id, name, imageUrl and email
      Store.commit("setUserId", googleUser.getBasicProfile().getId());
      this.$router.push("home");
    },
    onFailure(e) {
      console.log(e);
      Store.commit("setUserId", "Bleh");
      this.$router.push("home");
    },
    goToHome() {
      this.$router.push("home");
    },
  },
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
  font-family: "Skranji", cursive;
}

.logo {
  top: 15%;
  height: 400px;
}

.el-row {
  margin-top: 10px;
}

.beta {
  margin-top: 0px;
  color: #aa0000;
  margin-bottom: 10px;
}
.beta h2 {
  margin-top: 0px;
  margin-bottom: 5px;
}
.beta h1 {
  margin-bottom: 0px;
}
.beta p {
  margin-top: 0px;
  margin-bottom: 0px;
}
</style>
