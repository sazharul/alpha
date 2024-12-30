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

                    // Redirect to dashboard
                    window.location.href = "dashboard.html";

                    // if (data.groups[0] === 'merchant' || data.groups[0] === 'agent' || data.groups[0] === '') {
                    //     localStorage.setItem("accessToken", data.access);
                    //     localStorage.setItem("refreshToken", data.refresh);
                    //     localStorage.setItem("email", data.email);
                    //     localStorage.setItem("userRole", data.groups[0]);
                    //     localStorage.setItem("username", data.username);
                    //
                    //     // Redirect to dashboard
                    //     window.location.href = "dashboard.html";
                    // } else {
                    //     toastMixin.fire({
                    //         icon: 'error',
                    //         title: 'You don\'t have any group to access now',
                    //     });
                    //     // redirect to login page
                    //    // set waiting time to 2 seconds
                    //     setTimeout(() => {
                    //         window.location.href = "signin.html";
                    //     }, 2000);
                    // }
                }

            } catch (error) {
                $('.preloader').hide();
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