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
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Post</th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

function addEmployee() {
  var userId = firebase.auth().currentUser.uid;
  var writeData = {
    name: this.form.name,
    age: this.form.age,
    gender: this.form.gender,
    post: this.form.post,
  };

  var newPostKey = firebase
    .database()
    .ref()
    .child("employees")
    .child(userId)
    .push().key;

  return firebase
    .database()
    .ref("employees/" + userId + "/" + newPostKey)
    .set(writeData);
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
    };
  },
  created: function() {
    (function() {
      var userId = firebase.auth().currentUser.uid;

      firebase
        .database()
        .ref("/employees/" + userId)
        .once("value")
        .then((snapshot) => {
          console.log(snapshot.val());
        });
    })();
  },
  methods: {
    onClickLogout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("logged out successfully!");
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
  border: 1px solid grey;
  border-radius: 2px;
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  margin: 8px 0;
}

form > * {
  margin: 8px;
}
</style>
