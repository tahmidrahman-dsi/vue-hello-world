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

export function onAuthStateChanged(onSuccess, onFail) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      onSuccess(user);
    } else {
      onFail();
    }
  });
}

export function signOut(callback) {
  firebase
    .auth()
    .signOut()
    .then(callback);
}
