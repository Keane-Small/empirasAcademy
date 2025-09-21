import { signInWithEmailAndPassword, auth } from "./firebaseConfig.js";

const loginButton = document.getElementById('login-btn2');
loginButton.addEventListener('click', function () {
    const emailLogin = document.getElementById('loginEmail').value.trim();
    const passwordLogin = document.getElementById('loginPassword').value.trim();
    signInWithEmailAndPassword(auth, emailLogin, passwordLogin)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('Login Successful');

            // Navigate to the main app's profile page (two levels up from this folder)
            window.location.href = '../../profile.html';
            console.log(emailLogin);

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
});


