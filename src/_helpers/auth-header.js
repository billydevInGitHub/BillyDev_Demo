import { authenticationService } from '../_services/authenticationService';

export function authHeader() {
    // return authorization header with jwt token
    const currentUser = authenticationService.currentUserValue;
    console.log('auth-header.js: currentUser is: '+JSON.stringify(currentUser));
   

    if (currentUser && currentUser.token ) {
        
        return { Authorization: `Bearer ${currentUser.token}`, 
                'Content-Type': `application/json` };
    } else {
        let curUser=JSON.parse(currentUser); 
        if(curUser&&curUser.token){
            return { Authorization: `Bearer ${curUser.token}`, 
                'Content-Type': `application/json` };
        }else{
            return {};
        }
    }
}