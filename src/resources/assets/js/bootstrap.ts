import axios from 'axios';

declare global {
    interface Window {
        axios: any;
    }
}

(window as any).axios = axios;

/**
 * We'll load the Axios HTTP library which allows us to easily issue requests
 * to our OstroJS back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by OstroJS. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */
