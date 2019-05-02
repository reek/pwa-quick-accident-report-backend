import * as imgur from 'imgur';

// doc: https://www.npmjs.com/package/imgur

// Settings
imgur.setClientId(process.env.IMGUR_CLIENT_ID);
imgur.setAPIUrl(process.env.IMGUR_API_URL)

export const uploadImageBase64 = async (base64: string) => {
    const data = base64.split(";base64,").pop()
    return await imgur.uploadBase64(data).then(_ => _.data.link);
}

export const uploadImagesBase64 = (images: any[]) => {
    const imgs = images.map(item => item.imageUrl.split(";base64,").pop())
    return imgur.uploadImages(imgs, "Base64")
        .then((res) => res.map(data => data.link))
        .catch((err) => {
            console.error(err.message);
            return false
        });
}

export const uploadImagesBase64Async = async (images: any[]) => {
    const imgs = images.map(item => item.imageUrl.split(";base64,").pop())
    return await imgur.uploadImages(imgs, "Base64")
        .then((res) => res.map(data => data.link))
        .catch((err) => {
            console.error(err.message);
            return false
        });
}


