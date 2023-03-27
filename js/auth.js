const auth = firebase.auth();
const user = auth.currentUser;

if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    // ...

    window.location.href = "./index.html";
} else {

    window.location.href = "./index.html";
}