import { authenticationService } from '../_services/authenticationService';

export function authHeader() {
    // return authorization header with jwt token
    const currentUser = authenticationService.currentUserValue;
    console.log('auth-header.js: the attached token is: '+currentUser.token);
    if (currentUser.result&&currentUser.result.token) {
        
        return { Authorization: `Bearer ${currentUser.result.token}` };
    } else {
        return {};
    }
}