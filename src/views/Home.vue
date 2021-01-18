<template>
  <div class="home">
    <Header />
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
      <EmployeeForm v-if="viewpane" mode="add" />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Post</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>
              <router-link v-bind:to="`/details/${item.id}`">
                {{ item.name }}
              </router-link>
            </td>
            <td>{{ item.age }}</td>
            <td>{{ item.gender }}</td>
            <td>{{ item.post }}</td>
            <td>
              <DeleteButton v-bind:id="item.id" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { establishDBConnenction, detachDBConnection } from "../dbUtils";
import { signOut } from "../authUtils";
import Header from "../components/Header";
import EmployeeForm from "../components/EmployeeForm";
import DeleteButton from "../components/DeleteButton";

export default {
  name: "Home",
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
  components: {
    Header,
    EmployeeForm,
    DeleteButton,
  },
  created: function() {
    establishDBConnenction(
      function(value) {
        var items =
          !!value &&
          Object.entries(value).map(([key, item]) => ({
            id: key,
            ...item,
          }));

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
