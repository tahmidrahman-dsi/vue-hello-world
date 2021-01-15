<template>
  <div class="login">
    <img alt="logo" src="../assets/logo.png" id="appLogo" />
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm";

export default {
  name: "Login",
  components: {
    LoginForm,
  },
};
</script>

<style scoped>
#appLogo {
  margin-top: 30px;
}
</style>
