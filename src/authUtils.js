import firebase from "firebase";

/**
 *
 * Exposing the config snippet
 * https://stackoverflow.com/a/37484053/10318707
 * 2021-01-18
 *
 *
 */

export function configureFirebaseSDK() {
  var firebaseConfig = {
    apiKey: "AIzaSyAazgQ9wCtQ3VWvF72LRhEeILB6OSxSTD0",
    authDomain: "test-gcp-8a76d.firebaseapp.com",
    projectId: "test-gcp-8a76d",
    storageBucket: "test-gcp-8a76d.appspot.com",
    messagingSenderId: "545365015874",
    appId: "1:545365015874:web:47668fa793349602985cdb",
    measurementId: "G-XCKG085125",
    databaseURL: "test-gcp-8a76d-default-rtdb.firebaseio.com",
  };

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}

export function onAuthStateChanged(onSignIn, onSignOut) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      onSignIn(user);
    } else {
      onSignOut();
    }
  });
}

export function signIn(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export function signOut() {
  return firebase.auth().signOut();
}

export function isAuthenticated() {
  return Boolean(firebase.auth().currentUser);
}
