import apiClient from './axios.js';

document.addEventListener("DOMContentLoaded", () => {
    const registrationForm = document.getElementById("registration-form");

    if (registrationForm) {
        registrationForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            $('.preloader').show();

            // Get form values
            const email = document.getElementById("useremail").value;
            const username = document.getElementById("username").value;
            const password = document.getElementById("password-input").value;
            const referral = document.getElementById("referral").value;

            // Basic validation
            if (!email || !username || !password) {
                toastMixin.fire({
                    icon: 'error',
                    title: 'Please fill all required fields.'
                });
                return;
            }

            try {
                // Send registration request to backend
                const response = await apiClient.post("/api/v1/app-auth/register/", {
                    email,
                    username,
                    password,
                    referral
                });

                // set email in localStorage
                localStorage.setItem("email", email);

                $('.preloader').hide();

                // Assuming you get a success message upon successful registration
                window.location.href = "otp.html";

            } catch (error) {
                const errorMessages = Object.values(error.response.data.data).flat()
                console.error(errorMessages);
                $('.preloader').show();
                // Handle errors from backend

                if (error.response.data.status === false) {
                    // errorMessages
                    toastMixin.fire({
                        icon: 'error',
                        title: errorMessages[0]
                    });
                }

            }
        });
    }
});
