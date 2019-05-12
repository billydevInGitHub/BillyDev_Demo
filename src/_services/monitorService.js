import * as ConstantsClass from '../Constants'

import { authHeader } from '../_helpers/auth-header';
import {  handleResponse } from '../_helpers/handle-response';

export const monitorService = {
    getRTAppInfo
};

function getRTAppInfo() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    //todo: need pass in app id
    return fetch(ConstantsClass.SERVER_URL+`/rt_appl_info/`, requestOptions).then(handleResponse);
}



export default monitorService