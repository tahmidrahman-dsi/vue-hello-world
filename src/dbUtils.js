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

export function updateEmployee(id, employee) {
  var userId =
    (firebase.auth().currentUser && firebase.auth().currentUser.uid) || "";
  var writeData = {
    name: employee.name,
    age: employee.age,
    gender: employee.gender,
    post: employee.post,
  };
  var updates = {};
  var reference = "employees/" + userId + "/" + id + "/";
  Object.keys(writeData).forEach((key) => {
    updates[reference + key] = writeData[key];
  });

  return firebase
    .database()
    .ref()
    .update(updates);
}

export async function readEmployee(id) {
  var userId =
    (firebase.auth().currentUser && firebase.auth().currentUser.uid) || "";
  const snapshot = await firebase
    .database()
    .ref("/employees/" + userId + "/" + id)
    .once("value");
  return snapshot.val();
}

export function deleteEmployee(id) {
  var userId =
    (firebase.auth().currentUser && firebase.auth().currentUser.uid) || "";
  var reference = "employees/" + userId + "/" + id + "/";
  return firebase
    .database()
    .ref(reference)
    .remove();
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
