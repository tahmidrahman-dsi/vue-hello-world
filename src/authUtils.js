import firebase from "firebase";

export function configureFirebaseSDK() {
  var firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_FIREBASE_APP_ID,
    measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
    databaseURL: process.env.VUE_APP_FIREBASE_RT_DATABASE_URL,
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
