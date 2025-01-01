import apiClient from './axios.js';

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            $('.preloader').show();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password-input").value;

            try {
                const response = await apiClient.post("/api/v1/app-auth/login/token/", {email, password});


                // Store tokens in localStorage

                if (response.status) {
                    $('.preloader').hide();
                    let data = response.data;

                    console.log(data.groups[0]);

                    localStorage.setItem("accessToken", data.access);
                    localStorage.setItem("refreshToken", data.refresh);
                    localStorage.setItem("email", data.email);
                    localStorage.setItem("userRole", data.groups[0]);
                    localStorage.setItem("username", data.username);


                    // show success message
                    toastMixin.fire({
                        icon: 'success',
                        title: response.message
                    });

                    setTimeout(() => {
                        // localStorage.getItem remove email
                        window.location.href = "dashboard.html";
                    }, 1000);
                }

            } catch (error) {
                $('.preloader').hide();

                if (error.response.data.status === false) {
                    // errorMessages
                    toastMixin.fire({
                        icon: 'error',
                        title: error.response.data.message
                    });
                }
            }
        });
    }
});