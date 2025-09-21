const signupSection = document.getElementById('Signup');
const loginSection = document.getElementById('Login');

const signupButton = document.getElementById('signup-btn');
const loginButton = document.getElementById('login-btn');

signupSection.style.opacity = '0';


function showLogin(){
    
    
    signupSection.style.marginLeft = '100%';
    

    setTimeout(() => {
        loginSection.style.marginLeft = '-100%';
        loginSection.style.opacity = '1';
        signupSection.style.opacity = '0';


    }, 300);
}



function showSignup(){
    loginSection.style.marginLeft = '-100%';
    signupSection.style.marginLeft = '0%';
    signupSection.style.opacity = '1';
    loginSection.style.opacity = '0';
}
let signupFlag = true;
loginButton.addEventListener('click', function(){
    signupFlag = false;
    if(signupFlag === false){
        showLogin();
    }
});

signupButton.addEventListener('click', function(){
    signupFlag = true;
    if(signupFlag === true){
        showSignup();
    }
});



