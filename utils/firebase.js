// utils/firebase.js
const { bucket } = require('../firebase/firebase');
const { v4: uuidv4 } = require('uuid');

const uploadImageToFirebase = async (file) => {
    const fileName = `${uuidv4()}_${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    return new Promise((resolve, reject) => {
        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        });

        blobStream.on('error', (error) => {
            reject(error);
        });

        blobStream.on('finish', () => {
            fileUpload.getSignedUrl({
                action: 'read',
                expires: '03-01-2500'
            }).then((signedUrls) => {
                resolve(signedUrls[0]);
            }).catch(reject);
        });

        blobStream.end(file.buffer);
    });
};

module.exports = { uploadImageToFirebase };
