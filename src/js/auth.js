export function isAuthenticated() {
    const accessToken = localStorage.getItem("accessToken");
    return !!accessToken; // Returns true if access token exists
}

export function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "logout.html"; // Redirect to login page
}
