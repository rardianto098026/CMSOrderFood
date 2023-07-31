// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
var accessToken = localStorage.getItem("accessToken");

function isValidToken(token) {
    if (!token) {
        // If the token is empty or not provided, return false
        return false;
    }

    // Split the token into three parts: header, payload, and signature
    var tokenParts = token.split('.');

    if (tokenParts.length !== 3) {
        // If the token does not have three parts, it is invalid
        return false;
    }

    // Get the payload part and decode it from base64
    var payload = JSON.parse(atob(tokenParts[1]));

    // Check if the token is expired
    var expirationTime = payload.exp;
    var currentTime = Math.floor(Date.now() / 1000); // Convert current time to UTC timestamp
    if (expirationTime && expirationTime <= currentTime) {
        // Token is expired
        return false;
    }

    // Token is valid
    return true;
}

if (!accessToken || !isValidToken(accessToken)) {
    // Redirect to the login page
    window.location.href = "/login";
}