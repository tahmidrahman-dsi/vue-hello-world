<template>
  <div id="login-form-container">
    <form v-on:submit.prevent="onSubmit">
      <label for="email">
        Email
      </label>
      <input id="email" v-model="email" />
      <label for="password">Password</label>
      <input id="password" type="password" v-model="password" />
      <button>Login</button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "LoginForm",
  data: function() {
    return { email: "", password: "" };
  },
  methods: {
    onSubmit: function() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((user) => console.log(user))
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    },
  },
};
</script>

<style scoped>
#login-form-container {
  min-height: 30vh;
  background-color: #57b77c;
  display: flex;
  justify-content: center;
  align-items: center;
}

label {
  text-align: left;
  margin: 4px 0;
}

input {
  margin-bottom: 8px;
  padding: 4px;
}

form {
  display: flex;
  flex-direction: column;
}

button {
  margin-top: 8px;
  padding: 10px;
  background-color: #276296;
  color: white;
  border: none;
}
</style>
