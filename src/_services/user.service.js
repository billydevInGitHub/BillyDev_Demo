//import config from 'config';
import * as ConstantsClass from '../Constants'
import { authHeader } from '../_helpers/auth-header';
import {  handleResponse } from '../_helpers/handle-response';




export const userService = {
    getAll
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
   // return fetch(`http://localhost:4000/users/authenticate/users`, requestOptions).then(handleResponse);
   return fetch(ConstantsClass.SERVER_URL+`/users`, requestOptions).then(handleResponse);
}



export default userService