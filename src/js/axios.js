import axios from 'axios';

// Create an Axios instance with default settings
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://147.79.66.187:8000', // Replace with your API URL or use env variables
    timeout: 0, // Timeout for requests (in milliseconds)
    headers: {
        'Content-Type': 'application/json', // Default content type
        Accept: 'application/json',         // Accept header
    },
});

// Add a request interceptor
apiClient.interceptors.request.use(
    (config) => {
        // Add authorization token to headers
        const accessToken = localStorage.getItem('accessToken'); // Retrieve the access token from localStorage
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
apiClient.interceptors.response.use(
    (response) => {
        // Any status code within 2xx will trigger this
        return response.data; // Simplify response to return only data
    },
    async (error) => {
        // Handle response errors
        const originalRequest = error.config;

        // If the error is due to an expired access token (401)
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Avoid infinite retry loop
            const refreshToken = localStorage.getItem('refreshToken'); // Retrieve the refresh token

            if (refreshToken) {
                try {
                    // Attempt to refresh the access token
                    const response = await axios.post(
                        `${import.meta.env.VITE_API_BASE_URL || 'http://147.79.66.187:8000'}/login/refresh/`,
                        {refresh: refreshToken},
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    );

                    const {access} = response.data;

                    // Save the new access token in localStorage
                    localStorage.setItem('accessToken', access);

                    // Update the Authorization header in the original request and retry it
                    originalRequest.headers.Authorization = `Bearer ${access}`;
                    return apiClient(originalRequest);
                } catch (refreshError) {
                    console.error('Token refresh failed:', refreshError);
                    // Log the user out if the refresh fails
                    handleLogout();
                }
            } else {
                // No refresh token available, log out the user
                handleLogout();
            }
        }

        return Promise.reject(error);
    }
);

// Handle logout (clear tokens and redirect to login page)
// function handleLogout() {
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//     window.location.href = '/signin.html'; // Redirect to the login page
// }

window.handleLogout = function () {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/logout.html'; // Redirect to the login page
}

export default apiClient;
