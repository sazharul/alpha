import {isAuthenticated, logout} from "./auth";

document.addEventListener("DOMContentLoaded", () => {
    if (!isAuthenticated()) {
        // Redirect unauthorized user to login page
        window.location.href = "logout.html";
    }

    // Add logout functionality
    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            logout();
        });
    }
});
