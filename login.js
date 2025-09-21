import { signInWithEmailAndPassword, auth } from "./firebaseConfig.js";

const loginButton = document.getElementById('login-btn2');
loginButton.addEventListener('click', function () {
    const emailLogin = document.getElementById('loginEmail').value.trim();
    const passwordLogin = document.getElementById('loginPassword').value.trim();
    signInWithEmailAndPassword(auth, emailLogin, passwordLogin)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('Login Successful');

            // window.location.href = 'dashboard.html';
            console.log(emailLogin);

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
});


