<template>
  <transition name="el-fade-in">
    <div class="splash">
      <el-row>
        <el-image class="logo" :src="asset" fit="contain"></el-image>
      </el-row>
      <el-row>
        <h1>BALDR SLICER</h1>
      </el-row>
      <el-row class="beta">
        <h2>ALPHA VERSION</h2>You should know that the state of this app is not viable yet.
        <p>Please, bear in mind that NO gcode from this app should be used without proper supervision.</p>
        <p>I cannot be held responsible for any damage that might come from using this app.Test.</p>
      </el-row>
      <el-row>Login</el-row>
      <el-row>
        <input type="text" />
      </el-row>
      <el-row>Password</el-row>
      <el-row>
        <input type="text" />
      </el-row>
      <el-row :gutter="20">
        <el-col :span="3" :offset="9">
          <el-button type="primary" icon="el-icon-key" style="width:100%" disabled>Login</el-button>
        </el-col>
        <el-col :span="3">
          <el-button
            type="primary"
            icon="el-icon-user"
            style="width:100%"
            disabled
          >Create an account</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-link type="primary" disabled>I forgot my password</el-link>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
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
      </el-row>
    </div>
  </transition>
</template>

<script>
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css"; // It can also be imported as { GoogleLogin }
import GoogleLogin from "vue-google-login";
import Store from "../components/store";
Vue.use(ElementUI);
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
