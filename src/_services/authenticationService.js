import { BehaviorSubject } from 'rxjs';
import { handleResponse } from '../_helpers/handle-response';
import * as ConstantsClass from '../_helpers/Constants'
import { authHeader } from '../_helpers/auth-header';


console.log('authenticationservice.js  displaying localstorage : '+localStorage.stringify);
console.log("local storage");
let i=0; 
for (i = 0; i < localStorage.length; i++)   {
    console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
}
const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    jwtRenew,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};


function jwtRenew(){

    const requestOptions = { method: 'POST', headers: authHeader(), body: JSON.stringify({'type':'renew token'})};

        console.log('user.service.js  within jwtRenew method  requestOptions is ...'+requestOptions); 
    fetch(ConstantsClass.SERVER_URL+'/token/renew-token', requestOptions)
        .then(handleResponse)
        .then(user => {

            console.log('authenticationService.js with jwtRenew about to set up localstorage...user is:'+JSON.stringify(user)); 
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        });
}


function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    console.log('authenticationService.js  within login method...'); 
    return fetch(ConstantsClass.SERVER_URL+'/token/generate-token', requestOptions)
        .then(handleResponse)
        .then(user => {

            console.log('authenticationService.js  about to set up localstorage...user is:'+JSON.stringify(user)); 
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}

export default authenticationService
//export * from './authenticationService';
//export * from './user.service';