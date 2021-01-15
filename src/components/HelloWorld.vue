<template>
  <div class="hello">
    <p>Congratulations! You are logged in</p>

    <template v-if="viewpane">
      <button class="toggle" v-on:click.prevent="onClickTogglePane">
        Collapse
      </button>
    </template>
    <button v-else class="toggle" v-on:click.prevent="onClickTogglePane">
      Add employee
    </button>
    <button v-on:click.prevent="onClickLogout">Logout</button>
    <div class="Table-wrapper">
      <form v-if="viewpane" v-on:submit.prevent="onSubmitEmployeeData">
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
        <button>Add</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Post</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.age }}</td>
            <td>{{ item.gender }}</td>
            <td>{{ item.post }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {
  insertEmployee,
  establishDBConnenction,
  detachDBConnection,
} from "../dbUtils";
import { signOut } from "../authUtils";

function addEmployee() {
  var employee = this.form;

  return insertEmployee(employee);
}
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data: function() {
    return {
      viewpane: false,
      form: {
        name: "",
        age: "",
        gender: "M",
        post: "",
      },
      items: [],
    };
  },
  created: function() {
    establishDBConnenction(
      function(snapshot) {
        var snapshotVal = snapshot.val();
        var items = snapshotVal && Object.values(snapshotVal);
        if (Array.isArray(items)) {
          this.items = items;
        }
      }.bind(this)
    );
  },
  destroyed: function() {
    detachDBConnection();
  },
  methods: {
    onClickLogout: function() {
      signOut(function() {
        console.log("Logged out");
      });
    },
    onClickTogglePane: function() {
      this.viewpane = !this.viewpane;
    },
    onSubmitEmployeeData: function() {
      addEmployee
        .apply(this, [])
        .then(console.log)
        .catch(console.log);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.toggle {
  margin-right: 16px;
}

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

.Table-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.Table-wrapper:first-child {
  margin-right: 16px;
}
table {
  margin: 16px auto;
  border-radius: 6px;
  border: 1px solid grey;
  background: lightgrey;
}

th {
  padding: 8px;
}

td {
  background: white;
  padding: 8px;
}
</style>
