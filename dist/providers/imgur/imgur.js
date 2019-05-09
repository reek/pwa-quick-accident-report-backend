"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const imgur = require("imgur");
imgur.setClientId(process.env.IMGUR_CLIENT_ID);
imgur.setAPIUrl(process.env.IMGUR_API_URL);
exports.uploadImageBase64Asnc = async (base64) => {
    const data = base64.split(";base64,").pop();
    return await imgur.uploadBase64(data).then(res => res.data.link).catch((err) => err.message);
};
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
    return await exports.uploadImagesBase64(images);
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
