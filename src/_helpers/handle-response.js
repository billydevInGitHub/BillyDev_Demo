import { authenticationService } from '../_services/authenticationService';

export function handleResponse(response) {
    return response.result().then(result => {
        console.log('handle-response.js handling response...');
        const data = result && JSON.parse(result);
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                authenticationService.logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        console.log('handle-response.js the return data as following...');
        console.log(data);
        return data;
    });
}