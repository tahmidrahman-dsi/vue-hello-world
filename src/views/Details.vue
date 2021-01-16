<template>
  <div class="details">
    <Header />
    <EmployeeForm mode="update" />
  </div>
</template>

<script>
import Header from "../components/Header";
import EmployeeForm from "../components/EmployeeForm";

export default {
  components: {
    Header,
    EmployeeForm,
  },
};
</script>
