/* firebase config */

firebase.initializeApp({
  apiKey: 'AIzaSyDZ1Otp4daxrZpi-fKKBNHyLPYqRmT8mIk',
  authDomain: 'which-song.firebaseapp.com',
  projectId: 'which-song'
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

