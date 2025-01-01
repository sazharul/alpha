// Retrieve tokens and user details from localStorage
const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");
const email = localStorage.getItem("email");
const userRole = localStorage.getItem("userRole");

// List of public pages that don't require authentication
const publicPages = [
    "index.html",
    "set-new-password.html",
    "reset-password-otp.html",
    "signin.html",
    "signup.html",
    "forgot-password.html",
    "otp.html",
    "logout.html",
    "forget-otp.html"
];

// Function to check if the current URL matches any public page
function isPublicPage() {
    return publicPages.some(page => window.location.href.includes(page));
}

// Main logic for page access
if (!accessToken) {
    // Redirect to sign-in if no access token is present
    if (!isPublicPage()) {
        window.location.href = "signin.html";
    }
} else {
    // Redirect authenticated users away from public pages
    if (isPublicPage()) {
        window.location.href = "dashboard.html";
    }
}
