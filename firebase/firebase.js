// firebase/firebase.js
const admin = require('firebase-admin');
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'book-keeping-8a348.appspot.com'
});

const bucket = admin.storage().bucket();

module.exports = { bucket };
