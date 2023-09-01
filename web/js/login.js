"use strict";
import { messageRenderer } from "./renderers/messages.js";
import { sessionManager } from "./utils/session.js";
import { authAPI_auto } from "./api/_auth.js";

function main() {
    let formulario = document.getElementById("form-login");
    formulario.onsubmit = handleSubmitLogin;
}

function handleSubmitLogin(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form); 

    sendLogin(formData);
}

async function sendLogin(formData) {
    try {
        let loginData = await authAPI_auto.login(formData);
        let sessionToken = loginData.sessionToken;
        let loggedUser = loginData.user;
        sessionManager.login(sessionToken, loggedUser);
        window.location.href = "http://127.0.0.1:8080/recent_pictures.html";

    } catch (err) {
        messageRenderer.showWarningMessage("Error registering a new user", err);
    }
}

document.addEventListener("DOMContentLoaded", main);