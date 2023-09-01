"use strict";

import { sessionManager } from "./utils/session.js";

async function main() {
    hideActionsColumn();
}

function hideActionsColumn() {
    let actions_col = document.getElementById("indice");
    if (!sessionManager.isLogged()) {
        actions_col.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", main);