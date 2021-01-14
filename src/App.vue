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
import firebase from "firebase";
import HelloWorld from "./components/HelloWorld";
import Loader from "./components/Loader";

var firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.VUE_APP_FIREBASE_RT_DATABASE_URL,
};

export default {
  name: "App",
  data: function() {
    return {
      authenticated: null,
    };
  },
  created: function() {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    firebase.auth().onAuthStateChanged(
      function(user) {
        if (user) {
          console.log("User signed in");
          this.authenticated = true;
        } else {
          console.log("User not signed in");
          this.authenticated = false;
        }
      }.bind(this)
    );
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
