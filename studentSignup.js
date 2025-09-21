import { auth, db, createUserWithEmailAndPassword, serverTimestamp } from "./firebaseConfig.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js"; // ✅ added import

const signupFormbutton = document.getElementById('student-submit-btn');

if (signupFormbutton) {
    signupFormbutton.addEventListener('click', async (e) => {
        e.preventDefault();

        // Get the logged-in parent UID
        const parent = auth.currentUser;
        if (!parent) {
            alert("Student signup disabled: no parent logged in.");
            return;
        }
        const parentUid = parent.uid;

        // Get student info from form
        const studentName = document.getElementById('student-first-name').value.trim();
        const studentSurname = document.getElementById('student-last-name').value.trim();
        const studentEmail = document.getElementById('student-email').value.trim();
        const studentClass = document.getElementById('class').value.trim();
        const studentPassword = document.getElementById('student-password').value.trim();

        if (!studentName || !studentSurname || !studentEmail || !studentClass || !studentPassword) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            // Create Firebase Auth account for the student
            const studentAuth = await createUserWithEmailAndPassword(auth, studentEmail, studentPassword);

            // Save student info under Parent → Students
            await addDoc(collection(db, "Parent", parentUid, "Students"), {
                Name: studentName,
                Surname: studentSurname,
                Email: studentEmail,
                Class: studentClass,
                UID: studentAuth.user.uid, // reference to Auth UID
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });

            alert("Student added successfully!");
            const subscribe = confirm(
                "Student signed up successfully!\n\nDo you want to subscribe now?\n\nClick OK for Subscription or Cancel to go to Login."
            );

            if (subscribe) {
                window.location.href = "https://buy.stripe.com/test_bJe5kC7kV9xh0dEfzO6sw00"; // go to subscription page
            } else {
                window.location.href = "index.html"; // go to login page
            }
        } catch (error) {
            console.error(error);
            alert("Error adding student: " + error.message);
        }
    });
}

const studentLoginBtn = document.getElementById('login-btn2');

if (studentLoginBtn) { //prevent null error
    studentLoginBtn.addEventListener("click", async () => {
        const email = document.getElementById("student-email").value.trim();
        const password = document.getElementById("student-login-password").value.trim();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const student = userCredential.user;

            console.log("Student logged in:", student.uid);

            // Redirect to subscription page first
            window.location.href = "subscription.html";
        } catch (err) {
            console.error("Login error:", err.message);
            alert("Login failed: " + err.message);
        }
    });
}

