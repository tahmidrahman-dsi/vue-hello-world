import firebase from "firebase";

export function insertEmployee(employee) {
  var userId =
    (firebase.auth().currentUser && firebase.auth().currentUser.uid) || "";
  var writeData = {
    name: employee.name,
    age: employee.age,
    gender: employee.gender,
    post: employee.post,
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

export function establishDBConnenction(listener) {
  var userId =
    (firebase.auth().currentUser && firebase.auth().currentUser.uid) || "";
  firebase
    .database()
    .ref("/employees/" + userId)
    .on("value", listener);
}

export function detachDBConnection() {
  var userId =
    (firebase.auth().currentUser && firebase.auth().currentUser.uid) || "";
  firebase
    .database()
    .ref("/employees/" + userId)
    .off();
}
