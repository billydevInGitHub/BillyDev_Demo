import { authHeader } from '../_helpers/auth-header';
import {  handleResponse } from '../_helpers/handle-response';
import * as ConstantsClass from '../Constants'

export const eventService = {
    getAllDTApplications,
    getAllEvents,
    createNewDTApp,
    deleteDTApp,
    updateDTApp,
    triggerApp
};

function getAllDTApplications() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(ConstantsClass.SERVER_URL+`/api/dtapplications/`, requestOptions).then(handleResponse);
}


function getAllEvents() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(ConstantsClass.SERVER_URL+`/events`, requestOptions).then(handleResponse);
}

function createNewDTApp(data){
    console.log('eventService.js within createNewDTApp, input data is'+JSON.stringify(data)); 
    const requestOptions = { method: 'POST', headers: authHeader(), body: JSON.stringify(data) };
    return fetch(ConstantsClass.SERVER_URL+`/createdtapp`,requestOptions).then(handleResponse);
}

function deleteDTApp(index){
    console.log('eventService.js within deleteDTApp, input index is'+index); 
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(ConstantsClass.SERVER_URL+'/{'+index+'}/deletedtapp',requestOptions).then(handleResponse);
}

function updateDTApp(data){
    console.log('eventService.js within updateeDTApp, input data is'+JSON.stringify(data)); 
    const requestOptions = { method: 'POST', headers: authHeader(), body: JSON.stringify(data) };
    return fetch(ConstantsClass.SERVER_URL+'/updatedtapp',requestOptions).then(handleResponse);
}

function triggerApp(data){
        console.log('eventService.js within triggerApp, input data is:'+JSON.stringify(data)); 
        const requestOptions = { method: 'POST', headers:  authHeader(), body: JSON.stringify(data) };
        return fetch(ConstantsClass.SERVER_URL+'/api/rtapplication/',requestOptions).then(handleResponse);
    }


export default eventService