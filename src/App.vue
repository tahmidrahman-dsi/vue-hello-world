<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <Loader v-if="authenticated === null" />
    <HelloWorld v-else-if="authenticated" />
    <LoginForm v-else />
  </div>
</template>

<script>
import LoginForm from "./components/MyComponent";
import HelloWorld from "./components/HelloWorld";
import Loader from "./components/Loader";
import { configureFirebaseSDK, onAuthStateChanged } from "./authUtils";

export default {
  name: "App",
  data: function() {
    return {
      authenticated: null,
    };
  },
  created: function() {
    function onSuccess() {
      console.log("User signed in");
      this.authenticated = true;
    }

    function onFail() {
      console.log("User not signed in");
      this.authenticated = false;
    }

    configureFirebaseSDK();
    onAuthStateChanged(onSuccess.bind(this), onFail.bind(this));
  },
  components: {
    HelloWorld,
    LoginForm,
    Loader,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
