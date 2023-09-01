"use strict";

import { galleryRenderer } from "./renderers/gallery.js";
import {messageRenderer} from "./renderers/messages.js";
import { sessionManager } from "./utils/session.js";
import {photoswithusersAPI_auto} from "./api/_photoswithusers.js";

async function main() {
    loadAllPhotos();
    hideActionsColumn();
}

async function loadAllPhotos(){
    let galleryContainer = document.querySelector("div.container");
    try{
        let photos = await photoswithusersAPI_auto.getAll();
        let cardGallery = galleryRenderer.asCardGallery(photos);
        galleryContainer.appendChild(cardGallery);
    }catch(err){
        messageRenderer.showWarningMessage("Error while loading photos",err);
    }
}

function hideActionsColumn() {
    let actions_col = document.getElementById("indice");
    if (!sessionManager.isLogged()) {
        actions_col.style.display = "none";
    }
}



document.addEventListener("DOMContentLoaded", main);