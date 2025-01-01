import apiClient from './axios.js';

document.addEventListener("DOMContentLoaded", () => {
    const otpForm = document.getElementById("otpForm");

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
                const response = await apiClient.post("/api/v1/app-auth/verify-otp/", {
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
                        title: response.message
                    });

                    // go to login page
                    setTimeout(() => {
                        // localStorage.getItem remove email
                        localStorage.removeItem("email");
                        window.location.href = "signin.html";
                    }, 2000);
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

// Function to move to the next input field when a digit is entered
function moveToNext(currentInput, event) {
    if (event.key === "Backspace" && currentInput > 1) {
        document.getElementById(`digit${currentInput - 1}-input`).focus();
    } else if (event.key !== "Backspace" && currentInput < 4) {
        document.getElementById(`digit${currentInput + 1}-input`).focus();
    }
}

// onclick resendOtp id send OTP again wtih axios send email
document.addEventListener("DOMContentLoaded", () => {
    const resendOtpButton = document.getElementById("resendOtp");

    if(!resendOtpButton){
        return false;
    }

    if (resendOtpButton) {
        resendOtpButton.addEventListener("click", async () => {
            $('.preloader').show();

            const email = localStorage.getItem("email"); // Replace with the actual email source

            try {
                const response = await apiClient.post("/api/v1/app-auth/resend-verify-otp/", {email});

                if (response.status) {
                    $('.preloader').hide();

                    toastMixin.fire({
                        icon: 'success',
                        title: response.message
                    });
                }
            } catch (error) {
                $('.preloader').hide();

                if (error.response?.data?.status === false) {
                    toastMixin.fire({
                        icon: 'error',
                        title: error.response.data.message
                    });
                }
            }
        });
    } else {
        console.warn('The resendOtp element does not exist in the DOM.');
    }
});

