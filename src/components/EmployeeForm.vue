<template>
  <form v-on:submit.prevent="onSubmitEmployeeData">
    <label for="name">Name</label>
    <input id="name" v-model="form.name" />
    <label for="age">Age</label>
    <input id="age" v-model="form.age" type="number" />
    <label for="gender">Gender</label>
    <select id="gender" v-model="form.gender">
      <option value="M">Male</option>
      <option value="F">Female</option>
    </select>
    <label for="post">Post</label>
    <input id="post" v-model="form.post" />
    <button v-if="mode === 'add'">
      Add
    </button>
    <button v-else-if="mode === 'update'">
      Update
    </button>
    <div class="feedback" v-show="success">
      <span>
        Success!
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="lightseagreen"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-check"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
  </form>
</template>

<script>
import { insertEmployee, updateEmployee, readEmployee } from "../dbUtils";
export default {
  props: {
    mode: {
      validator: function(value) {
        return ["add", "update"].indexOf(value) !== -1;
      },
    },
  },
  created: function() {
    var id;
    if ((id = this.$route.params.id)) {
      readEmployee(id).then((value) => {
        this.form = value;
      });
    }
  },
  data: function() {
    return {
      form: {
        name: "",
        age: "",
        gender: "M",
      },
      success: false,
    };
  },
  methods: {
    onSubmitEmployeeData: function() {
      function onSuccess() {
        this.success = true;
      }

      var employee = this.form;
      if (this.$props.mode === "add") {
        insertEmployee(employee).then(onSuccess.bind(this));
      } else if (this.$props.mode === "update") {
        var id = this.$route.params.id;
        updateEmployee(id, employee).then(onSuccess.bind(this));
      }
    },
  },
};
</script>

<style scoped>
form {
  background: #f2f2f2;
  border-radius: 6px;
  padding: 16px;
  display: flex;
  flex: 1;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 8px 0;
  max-width: 600px;
}

label {
  text-align: left;
}

form > *:not(label) {
  padding: 6px;
  margin-bottom: 8px;
}

.feedback {
  display: inline-flex;
  align-items: center;
}

.feedback :first-child {
  margin-right: 16px;
}
</style>
