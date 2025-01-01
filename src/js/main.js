// add styles. scss
import '../scss/styles.scss';

import apiClient from './axios.js';
import $ from 'jquery';

window.$ = $;

// Example: Fetching data from an endpoint
// apiClient.get('/users')
//     .then((data) => {
//         console.log('User data:', data);
//     })
//     .catch((error) => {
//         console.error('Error fetching users:', error);
//     });

import Swal from 'sweetalert2';

var toastMixin = Swal.mixin({
    toast: true,
    icon: "success",
    title: "General Title",
    animation: false,
    position: "top-right",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});

window.toastMixin = toastMixin;

import './menu.js';
import './header.js';
import './custome.js';
import './login.js';
import './registration.js';
import './otp.js';
import './forgot-password.js';
import './set-new-password.js';