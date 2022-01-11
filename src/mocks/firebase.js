"use strict";
exports.__esModule = true;
exports.db = void 0;
// Import the functions you need from the SDKs you need
var app_1 = require("firebase/app");
var firestore_1 = require("firebase/firestore");
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_Domain,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};
// Initialize Firebase
(0, app_1.initializeApp)(firebaseConfig);
exports.db = (0, firestore_1.getFirestore)();
