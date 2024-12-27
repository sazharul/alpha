import apiClient from './axios.js';

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password-input").value;

            try {
                const response = await apiClient.post("/api/v1/app-auth/login/token/", {email, password});

                // Store tokens in localStorage
                localStorage.setItem("accessToken", response.access);
                localStorage.setItem("refreshToken", response.refresh);

                // Redirect to dashboard
                window.location.href = "dashboard.html";

            } catch (error) {
                console.error(error);
                // alert response message
                // toastMixin
                toastMixin.fire({
                    icon: 'error',
                    title: error.response.data.detail
                });
                // redirect to login page
                window.location.href = "signin.html";
            }
        });
    }
});