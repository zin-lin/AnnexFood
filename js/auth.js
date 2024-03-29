/**
 * Author: Zin Lin Htun
 */


/**
 * sign Out User
 */
const signOut = () => {

        auth.signOut().then(() => {alert("Signed out")
            window.location.href = "./index.html";
        }).catch((err) => {alert(err.messages)})

}


// global vars
var reg = 'sign';

auth.onAuthStateChanged(user => {

    var container = document.getElementById("container-login");
    var parentContainer = document.getElementById("login-container");
    parentContainer.style.visibility = "visible";
    if (user) {
        parentContainer.style.height = 96;
        parentContainer.style.boxShadow = 'none';
        parentContainer.style.backgroundColor ='transparent';
        container.innerHTML = `
        <div>
            <button class="shRed  redx" style="padding: 10px" onclick="signOut()">
                <div style="display: flex; align-items: center"> 
                    <p>Log out</p>
                    <span class = 'material-icons' style="margin-left: 10px">logout</span>
                </div>            
            </button>
        </div>
        `;
    }

})

const email = document.getElementById('email');
const password = document.getElementById('password');
const button = document.getElementById('button');
const sign_in = document.getElementById('sign-in');
const register = document.getElementById('register');


const signInReducer = ()=>{
    reg = 'sign';
    button.innerHTML = 'Sign In';
}
const registerReducer = ()=>{
    reg = 'reg';
    button.innerHTML = 'Register';
}


/**
 * Sign in with email and password
 */
button.addEventListener('click', (e) => {
    e.preventDefault();
    if (reg === 'sign') {
        auth.signInWithEmailAndPassword(email.value, password.value).then((user) => {
            if (user) {
                window.location.href = "./index.html";
            }
        }).catch(err => {
            alert(err.message)
        })
    }
    else if (reg ==='reg') {
        auth.createUserWithEmailAndPassword(email.value, password.value).then((user) => { if (user) {
            window.location.href = "./index.html";
        }
        }).catch(err => {
            alert(err.message)
        })
    }
})

sign_in.addEventListener('click', signInReducer);
register.addEventListener('click', registerReducer);