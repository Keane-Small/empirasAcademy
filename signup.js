const firstname = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
;
const passwordConfirmation = document.getElementById('passwordConfirmation');
const signupForm = document.getElementById('signupForm');
const signupFormbutton = document.getElementById('submit-btn');


const confirmPassword = document.getElementById('confirm-password');
const confirmPasswordMessage = document.getElementById('passwordConfirmationError');

const loginButton = document.getElementById('login-btn');

async function confirmPasswordFunc() {
    const passwordInput = password.value.trim();
    const confirmPasswordInput = confirmPassword.value.trim();

    if (confirmPasswordInput === "") {
        confirmPasswordMessage.style.display = "none";
        return;
    }

    if (passwordInput !== confirmPasswordInput) {
        confirmPasswordMessage.style.display = 'block';
        confirmPasswordMessage.style.color = "lightblue";
        confirmPasswordMessage.textContent = 'Passwords do not match';
    } else {
        confirmPasswordMessage.style.display = 'block';
        confirmPasswordMessage.style.color = "gray";
        confirmPasswordMessage.textContent = "✅ Passwords match";
    }
}


// password.addEventListener('input', confirmPasswordFunc);
// confirmPassword.addEventListener('input', confirmPasswordFunc);

import { auth, db, createUserWithEmailAndPassword, setDoc, doc, serverTimestamp } from "./firebaseConfig.js";



signupFormbutton.addEventListener('click', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save parent info in Firestore
        await setDoc(doc(db, "Parent", user.uid), {
            Name: firstName,
            Surname: lastName,
            Email: email,
            ContactNr: 0,
            SubPos: false,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });

        alert("Parent account created! Now add a student.");
        window.location.href = 'studentSignup.html'; // no need for parentUid in URL
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
});




// [END auth_signup_password_modular]
// document.getElementById('myButton').addEventListener('click', function() {
//     alert('Button was clicked!');
// });


