import { authenticationService } from '../_services/authenticationService';

export function handleResponse(response) {
    return response.json().then(body => {
        if (response.status === 200) {
            console.log('handle-response.js the return data as following...'+JSON.stringify(body))
         
            return body; 
            // const data = body && JSON.parse(body);
            // return data; 
            //return Promise.resolve(body); 
            //return body;
        } else {
            console.log("handle-response.js  error"); 
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                authenticationService.logout();
                window.location.reload(true);
            }

            const error = (body && body.message) || response.statusText;
            return Promise.reject(error);

        }
    })
    // response.json().then(body => console.log(body),err=>console.log(err)).catch(mesg=>console.log(mesg));
    //response.text().then(body => console.log(body),err=>console.log(err)).catch(mesg=>console.log(mesg));
    // console.log('handleResponse.js   '+JSON.stringify(response.json())); 
    // console.log('handleResponse.js   '+JSON.stringify(response.text())); 
    // console.log('handleResponse.js   '+JSON.stringify(response.type)); 
    // console.log('handleResponse.js   '+JSON.stringify(response.body)); 

    // return response.body().then(result => {
    //     console.log('handle-response.js handling response...');

    //     const data = result && JSON.parse(result);
    //     if (!response.ok) {
    //         if ([401, 403].indexOf(response.status) !== -1) {
    //             // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
    //             authenticationService.logout();
    //             window.location.reload(true);
    //         }

    //         const error = (data && data.message) || response.statusText;
    //         return Promise.reject(error);
    //     }
    //     console.log('handle-response.js the return data as following...');
    //     console.log(data);
    //     return data;
    // });
}