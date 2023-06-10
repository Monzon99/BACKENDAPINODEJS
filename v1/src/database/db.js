var admin = require('firebase-admin');

var serviceAccount = require("../../keyAuth.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://transportes-monzon-default-rtdb.firebaseio.com/'
});

const db = admin.firestore();

module.exports = db;