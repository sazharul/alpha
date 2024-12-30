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
            const email = localStorage.getItem("userEmail"); // Replace with the actual email source

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
                    // toastMixin show success message
                    $('.preloader').hide();

                    toastMixin.fire({
                        icon: 'success',
                        title: response.data.message
                    });

                    // go to login page
                    setTimeout(() => {
                        window.location.href = "signin.html";
                    }, 2000);
                }

            } catch (error) {
                console.error(error);

                if (error.response && error.response.data) {
                    const errorData = error.response.data;

                    // Check if the status is false and there are error messages in the data
                    if (errorData.status === false && errorData.data) {
                        const errorMessages = Object.values(errorData.data).flat();  // Flatten the array of errors

                        // Display the first error message (you can adjust this to show all errors if needed)
                        toastMixin.fire({
                            icon: 'error',
                            title: errorMessages[0] || 'An error occurred.'  // Default message
                        });
                    } else {
                        // Fallback error message
                        toastMixin.fire({
                            icon: 'error',
                            title: 'An error occurred during OTP verification.'  // Default message when status is not false
                        });
                    }
                } else {
                    // Handle network or other unexpected errors
                    toastMixin.fire({
                        icon: 'error',
                        title: 'Network error, please try again.'  // Default network error message
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
