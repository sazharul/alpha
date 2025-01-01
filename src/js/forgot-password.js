import apiClient from './axios.js';

document.addEventListener("DOMContentLoaded", () => {
    const forgotPasswordForm = document.getElementById("forgotPassword");

    if (!forgotPasswordForm) {
        return false;
    }

    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            $('.preloader').show();

            const email = document.getElementById("email").value;

            try {
                const response = await apiClient.post("/api/v1/app-auth/reset-password-otp/", {email});

                if (response.status) {
                    // store email in localStorage
                    localStorage.setItem("email", email);

                    $('.preloader').hide();

                    // Show success message
                    toastMixin.fire({
                        icon: 'success',
                        title: response.data.message
                    });

                    setTimeout(() => {
                        // Optionally redirect the user to another page, e.g., login page
                        window.location.href = "reset-password-otp.html";
                    }, 1000); // Adjust delay as needed
                }
            } catch (error) {
                $('.preloader').hide();

                if (error.response?.data?.status === false) {
                    // Show error message
                    toastMixin.fire({
                        icon: 'error',
                        title: error.response.data.message || 'Failed to send reset link.'
                    });
                } else {
                    // Handle other errors
                    toastMixin.fire({
                        icon: 'error',
                        title: 'An unexpected error occurred. Please try again later.'
                    });
                }
            }
        });
    } else {
        console.warn('The forgotPassword form does not exist in the DOM.');
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const otpForm = document.getElementById("resetOtpForm");

    if (!otpForm) {
        return false;
    }

    if (otpForm) {
        otpForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            $('.preloader').show();

            // Get the OTP from the form
            const otp = [
                document.getElementById("digit1-input").value,
                document.getElementById("digit2-input").value,
                document.getElementById("digit3-input").value,
                document.getElementById("digit4-input").value
            ].join(""); // Join the digits to form the full OTP string

            // Get email (this could be passed as a hidden field or stored in localStorage/sessionStorage)
            const email = localStorage.getItem("email"); // Replace with the actual email source

            // Validate OTP input
            if (otp.length !== 4) {
                toastMixin.fire({
                    icon: 'error',
                    title: 'Please enter a valid 4-digit OTP.'
                });
                return;
            }

            try {
                // Send the OTP verification request
                const response = await apiClient.post("/api/v1/app-auth/reset-password-verify-otp/", {
                    email,
                    otp
                });

                if (response.status) {

                    // store otp in localStorage
                    localStorage.setItem("otp", otp);

                    // toastMixin show success message
                    $('.preloader').hide();

                    toastMixin.fire({
                        icon: 'success',
                        title: response.data.message
                    });

                    // go to login page
                    setTimeout(() => {
                        // localStorage.getItem remove email
                        window.location.href = "set-new-password.html";
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