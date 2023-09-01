"use strict";

async function main(){
    let signUp = document.querySelector("#sign-up");
    signUp.onclick = buttonSignUp;

    let signIn = document.querySelector("#sign-in");
    signIn.onclick = buttonSignIn;
}

function buttonSignUp(){
    window.location = "register.html";
}

function buttonSignIn(){
    window.location = "login.html";
}

document.addEventListener("DOMContentLoaded", main);