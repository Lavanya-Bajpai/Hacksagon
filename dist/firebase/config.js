"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.analytics = exports.db = exports.auth = void 0;
var app_1 = require("firebase/app");
var auth_1 = require("firebase/auth");
var firestore_1 = require("firebase/firestore");
var analytics_1 = require("firebase/analytics");
var storage_1 = require("firebase/storage");
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyDyz66OBEXuhAmAXEkZNKIcNFSFa3ougI4",
    authDomain: "iitm-hackathon-42f92.firebaseapp.com",
    projectId: "iitm-hackathon-42f92",
    storageBucket: "iitm-hackathon-42f92.firebasestorage.app",
    messagingSenderId: "373714989305",
    appId: "1:373714989305:web:77135c1b20a0909618f228",
    measurementId: "G-9MP24QWBNJ"
};
// Initialize Firebase
var app = (0, app_1.initializeApp)(firebaseConfig);
// Initialize Firebase services
exports.auth = (0, auth_1.getAuth)(app);
exports.db = (0, firestore_1.getFirestore)(app);
exports.analytics = (0, analytics_1.getAnalytics)(app);
exports.storage = (0, storage_1.getStorage)(app);
exports.default = app;
