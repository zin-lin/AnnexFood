// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCer5U-7CTMrxxPYkKeeujFU5dx1Uj1HKs",
    authDomain: "annexcook.firebaseapp.com",
    databaseURL: "https://annexcook.firebaseio.com",
    projectId: "annexcook",
    storageBucket: "annexcook.appspot.com",
    messagingSenderId: "569533906797",
    appId: "1:569533906797:web:990b4df117825a5e92a464",
    measurementId: "G-VQG7761CJ9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();