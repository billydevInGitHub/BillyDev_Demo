export function configureFakeBackend() {
    console.log('fake-backend.js: showing the console message'); 

    let users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];
    let dtappls=[{id:1,appname:'test1',creator:'Billy',uploadtime:'2019-03-01T13:51:50'}, 
                 {id:2,appname:'test2',creator:'Flavio',uploadtime:'2019-03-06T13:51:50'}, 
                 {id:3,appname:'test3',creator:'Flavio',uploadtime:'2019-03-06T13:51:50'}, 
                 {id:4,appname:'test4',creator:'Flavio',uploadtime:'2019-03-06T13:51:50'}, 
                 {id:5,appname:'test5',creator:'Flavio',uploadtime:'2019-03-06T13:51:50'}, 
                 {id:6,appname:'test6',creator:'Flavio',uploadtime:'2019-03-06T13:51:50'}, 
                 {id:7,appname:'test7',creator:'Flavio',uploadtime:'2019-03-06T13:51:50'}, 
                 {id:8,appname:'test8',creator:'Flavio',uploadtime:'2019-03-06T13:51:50'}, 
                 {id:9,appname:'test9',creator:'Flavio',uploadtime:'2019-03-06T13:51:50'}]
    let rtapplinfo={
        "datasetForRect":[{"x":568,"y":185,"width":25,"height":25,"x_job_name":580,"y_job_name":230,"job_name":"~~~~_job2"},{"x":488,"y":185,"width":25,"height":25,"x_job_name":500,"y_job_name":230,"job_name":"~~~~_job1"},{"x":408,"y":185,"width":25,"height":25,"x_job_name":420,"y_job_name":230,"job_name":"~~~~_job4"},{"x":528,"y":345,"width":25,"height":25,"x_job_name":540,"y_job_name":390,"job_name":"~~~~_job3"},{"x":488,"y":25,"width":25,"height":25,"x_job_name":500,"y_job_name":70,"job_name":"~~~~_start"},{"x":408,"y":345,"width":25,"height":25,"x_job_name":420,"y_job_name":390,"job_name":"~~~~_job5"},{"x":488,"y":505,"width":25,"height":25,"x_job_name":500,"y_job_name":550,"job_name":"~~~~_end"}
        ],
        "datasetForLine":[
           {"x1":500,"y1":210,"x2":540,"y2":342,"hasArrow":"A"},{"x1":500,"y1":50,"x2":420,"y2":182,"hasArrow":"A"},{"x1":580,"y1":210,"x2":540,"y2":342,"hasArrow":"A"},{"x1":420,"y1":210,"x2":420,"y2":342,"hasArrow":"A"},{"x1":500,"y1":50,"x2":580,"y2":182,"hasArrow":"A"},{"x1":500,"y1":50,"x2":500,"y2":182,"hasArrow":"A"},{"x1":540,"y1":370,"x2":500,"y2":502,"hasArrow":"A"},{"x1":420,"y1":370,"x2":500,"y2":502,"hasArrow":"A"}
        ]
        }

    let realFetch = window.fetch;
    window.fetch = function (url, opts) {

        console.log('fake-backend.js   within redefined fetch first line...'); 
        const isLoggedIn = opts.headers['Authorization'] === 'Bearer fake-jwt-token';

        console.log('fake-backend.js   within redefined fetch method before return Promise...'); 
        return new Promise((resolve, reject) => {

            console.log("fake-backend.js redefining fetch method...")
            // wrap in timeout to simulate server api call
            setTimeout(() => {
                // authenticate - public
                if (url.endsWith('/token/generate-token') && opts.method === 'POST') {
                    const params = JSON.parse(opts.body);
                    const user = users.find(x => x.username === params.username && x.password === params.password);
                    if (!user) return error('Username or password is incorrect');
                    return ok({
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token: 'fake-jwt-token'
                    });
                }

                // get users - secure
                if (url.endsWith('/users') && opts.method === 'GET') {
                    if (!isLoggedIn) return unauthorised();
                    return ok(users);
                }

                // get dt applications
                if (url.endsWith('/dtapplications') && opts.method === 'GET') {
                    if (!isLoggedIn) return unauthorised();
                    return ok(dtappls);
                }          

                console.log('fake-backend.js  before url endup check, url is:'+url+' opts method:'+opts.method);
                // create dt applications
                if (url.endsWith('/createdtapp') && opts.method === 'POST') {
                    if (!isLoggedIn) return unauthorised();
                    return ok({'id':100, 'appname':'fake_created_appname', 'creator':'fakecreator'});
                }     
         

                // delete application
                if (url.endsWith('/deletedtapp') && opts.method === 'GET') {
                    if (!isLoggedIn) return unauthorised();
                    return ok({'id':100, 'appname':'fake_deleted_appname', 'creator':'fake_deleted_creator'});
                }     
                
                // update application
                if (url.endsWith('/updatedtapp') && opts.method === 'POST') {
                    if (!isLoggedIn) return unauthorised();
                    //just return what ever requested
                    return ok(JSON.parse(opts.body));
                }    
                // trigger application
                if (url.endsWith('/triggerapp') && opts.method === 'POST') {
                    if (!isLoggedIn) return unauthorised();
                    //just return what ever requested
                    return ok(JSON.parse(opts.body));
                } 

                // get rt application info
                if (url.endsWith('/rtappinfo') && opts.method === 'GET') {
                    console.log('fake-backend.js   within redefined fetch method for rtappinfo...'); 
                    if (!isLoggedIn) return unauthorised();
                    //just return what ever requested
                    return ok(rtapplinfo);
                } 

                console.log('fake-backend.js  did not catch the url is:'+url);
                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

                // private helper functions

                function ok(body) {
                    resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) })
                }

                function unauthorised() {
                    resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorised' })) })
                }

                function error(message) {
                    resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) })
                }
            }, 500);
        });
    }
}