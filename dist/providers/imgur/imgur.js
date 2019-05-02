"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const imgur = require("imgur");
imgur.setClientId(process.env.IMGUR_CLIENT_ID);
imgur.setAPIUrl(process.env.IMGUR_API_URL);
exports.uploadImagesBase64 = (images) => {
    const imgs = images.map(item => item.imageUrl.split(";base64,").pop());
    return imgur.uploadImages(imgs, "Base64")
        .then((res) => res.map(data => data.link))
        .catch((err) => {
        console.error(err.message);
        return false;
    });
};
exports.uploadImagesBase64Async = async (images) => {
    const imgs = images.map(item => item.imageUrl.split(";base64,").pop());
    return await imgur.uploadImages(imgs, "Base64")
        .then((res) => res.map(data => data.link))
        .catch((err) => {
        console.error(err.message);
        return false;
    });
};
exports.uploadImagesUrlAsync = async (images) => {
    const imgs = images.map(item => item.imageUrl);
    return await imgur.uploadImages(imgs, "Url")
        .then((res) => res.map(data => data.link))
        .catch((err) => {
        console.error(err.message);
        return false;
    });
};
