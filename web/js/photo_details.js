"use strict";

import { photoRenderer } from "./renderers/photos.js";
import { photosAPI_auto } from "./api/_photos.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "./utils/session.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");

async function main() {
    hideActionsColumn();
    loadPhotoDetails();
    let deleteBtn = document.querySelector("#button-delete");
    deleteBtn.onclick = handleDelete;

    let editBtn = document.querySelector("#button-edit");
    editBtn.onclick = handleEdit;

}


async function loadPhotoDetails() {
    let photoContainer = document.getElementById("photo-details-column");
    try {
        let photo = await photosAPI_auto.getById(photoId);
        let photoDetails = photoRenderer.asDetails(photo);
        photoContainer.appendChild(photoDetails);
    } catch (err) {
        messageRenderer.showWarningMessage("Error loading photo", err);
    }
}

async function handleDelete(event) {
    let answer = confirm("Do you really want to delete this photo?");
    if (answer) {
        try {
            await photosAPI_auto.delete(photoId);
            window.location = "/recent_pictures.html";
        } catch (err) {
            messageRenderer.showWarningMessage(err.response.data.message);
        }
    }
}

function handleEdit(event) {
    window.location.href = "edit-photo.html?photoId=" + photoId;
}

function hideActionsColumn() {
    let actions_col = document.getElementById("indice");
    if (!sessionManager.isLogged()) {
        actions_col.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", main);
