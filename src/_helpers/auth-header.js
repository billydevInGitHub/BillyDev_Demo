import { authenticationService } from '../_services/authenticationService';

export function authHeader() {
    // return authorization header with jwt token
    const currentUser = authenticationService.currentUserValue;
    console.log('auth-header.js: currentUser is: '+JSON.stringify(currentUser));
    if (currentUser.result&&currentUser.result.token) {
        
        return { Authorization: `Bearer ${currentUser.result.token}`, 
                'Content-Type': `application/json` };
    } else {
        return {};
    }
}