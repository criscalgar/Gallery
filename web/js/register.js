"use strict";
import { messageRenderer } from "./renderers/messages.js";
import { userValidator } from "./users.js";
import { sessionManager } from "./utils/session.js";
import { authAPI_auto } from "./api/_auth.js";

function main() {
    let formulario = document.getElementById("register-form");
    formulario.onsubmit = handleSubmitRegister;
}

function handleSubmitRegister(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);

    let errors = userValidator.validateRegister(formData);
    if (errors.length > 0) {
        let errorsDiv = document.getElementById("errors");
        errorsDiv.innerHTML = "";
        for (let error of errors) {
            messageRenderer.showWarningMessage(error);
        }
    }
    else {
        sendRegister(formData);
    }
}

async function sendRegister(formData) {
    try {
        let loginData = await authAPI_auto.register(formData);
        let sessionToken = loginData.sessionToken;
        let loggedUser = loginData.user;
        sessionManager.login(sessionToken, loggedUser);
        window.location.href = "http://127.0.0.1:8080/recent_pictures.html";

    } catch (err) {
        messageRenderer.showWarningMessage("Error registering a new user", err);
    }
}

document.addEventListener("DOMContentLoaded", main);