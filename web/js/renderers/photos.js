"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";

const photoRenderer = {
    asCard: function (photo) {
        let html = `<div class="col-md-4">
                        <div class="card bg-dark text-light" style="height:450px; weight:auto; margin-top:30px">
                            <a href="photo_detail.html?photoId=${photo.photoId}">
                                <img src="${photo.url}" class="card-img-top" style="height:300px; weight:auto">
                            </a>
                            <div class="card-body">
                                <h5 class="card-title text-center">${photo.title}</h5>
                                <p class="card-text">${photo.description}</p>
                                <p class="text-end">@${photo.username}
                                    <img src="${photo.avatarUrl}" class="photo-user-avatar"</p>
                            </div>
                        </div>
                    </div>`;
        let card = parseHTML(html);
        return card;
    },

    asDetails: function (photo) {
        let html = `<div class="row text-center">
                        <div class="row text-center">
                            <div class="col-md">
                                <h3>${photo.title}</h3>
                                <h6>${photo.description}</h6>
                                <p>Uploaded by <a href="user_profile.html" class="img-fluid">User ${photo.userId}</a> on ${photo.date}</p>
                                <hr>
                                <img src="${photo.url}" class="img-fluid" style="height:400px; width:auto">
                            </div>
                        </div>
                    </div>`;
        let photoDetails = parseHTML(html);
        return photoDetails;
    },
};

export { photoRenderer };