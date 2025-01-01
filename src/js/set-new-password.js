import apiClient from './axios.js';

document.addEventListener("DOMContentLoaded", () => {
    const registrationForm = document.getElementById("setUpNewPasswordForm");

    if (!registrationForm) {
        return false;
    }

    if (registrationForm) {
        registrationForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            $('.preloader').show();

            // Get form values
            const email = localStorage.getItem("email");
            // new password
            const new_password = document.getElementById("password_input").value;
            // confirm password
            const confirm_password = document.getElementById("confirm_password").value;

            // Basic validation
            if (!email || !new_password || !confirm_password) {
                toastMixin.fire({
                    icon: 'error',
                    title: 'Please fill all required fields.'
                });
                return;
            }

            try {
                // Send registration request to backend
                const response = await apiClient.post("/api/v1/app-auth/reset-password/", {
                    email,
                    new_password,
                    confirm_password
                });


                $('.preloader').hide();

                // response status true then
                if (response.status === true) {
                    // Assuming you get a success message upon successful registration

                    // success message
                    toastMixin.fire({
                        icon: 'success',
                        title: 'Password reset successfully.'
                    });

                    // redirect to login page after 1 second
                    setTimeout(() => {
                        window.location.href = "signin.html";
                    }, 1000);

                }

            } catch (error) {

                $('.preloader').hide();
                // Handle errors from backend

                if (error.response.data.status === false) {
                    // errorMessages
                    toastMixin.fire({
                        icon: 'error',
                        title: error.response.data.error
                    });
                }
            }
        });
    }
});
