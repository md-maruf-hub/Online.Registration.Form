/* ==========================================
   TNF Registration System
   Global Configuration
========================================== */

// ================= API =================

// Google Apps Script Web App URL
const API_URL = "https://script.google.com/macros/s/AKfycbwyjdzZAps9zwXxEWau_r5xub8wIcA2kICskRiVIFFe4W7yt0k-Mp-5cvyt2Bf4HhsA/exec";


// ================= PROJECT =================

const PROJECT = {

    NAME: "THE NAS FOUNDATION",

    PREFIX: "TNF",

    START_NUMBER: 260001

};


// ================= IMAGE =================

const IMAGE = {

    MAX_SIZE: 2 * 1024 * 1024, // 2 MB

    TYPES: [

        "image/jpeg",

        "image/jpg",

        "image/png",

        "image/webp"

    ]

};


// ================= VALIDATION =================

const VALIDATION = {

    PHONE_LENGTH: 11,

    PHONE_PREFIX: "01"

};


// ================= MESSAGE =================

const MESSAGE = {

    LOADING: "Registration Processing...",

    SUCCESS: "Registration Successful",

    SERVER_ERROR: "Server Error",

    DUPLICATE_PHONE: "Phone Number Already Registered"

};