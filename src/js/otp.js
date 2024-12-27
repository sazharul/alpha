import apiClient from './axios.js';

document.addEventListener("DOMContentLoaded", () => {
    const otpForm = document.getElementById("otpForm");

    if (otpForm) {
        otpForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Get the OTP from the form
            const otp = [
                document.getElementById("digit1-input").value,
                document.getElementById("digit2-input").value,
                document.getElementById("digit3-input").value,
                document.getElementById("digit4-input").value
            ].join(""); // Join the digits to form the full OTP string

            // Get email (this could be passed as a hidden field or stored in localStorage/sessionStorage)
            const email = localStorage.getItem("userEmail") || "maloy.virat@gmail.com"; // Replace with the actual email source

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

                // Handle success response
                if (response.data.message === "OTP verified successfully.") {
                    // Redirect to the dashboard or home page
                    window.location.href = "dashboard.html";
                } else {
                    // Handle unexpected response
                    toastMixin.fire({
                        icon: 'error',
                        title: 'OTP verification failed.'
                    });
                }
            } catch (error) {
                console.error(error);

                // Handle errors from backend
                if (error.response && error.response.data) {
                    toastMixin.fire({
                        icon: 'error',
                        title: error.response.data.detail || 'An error occurred during OTP verification.'
                    });
                } else {
                    // Handle network or other unexpected errors
                    toastMixin.fire({
                        icon: 'error',
                        title: 'Network error, please try again.'
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
