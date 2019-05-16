import React, { Component } from 'react';
import * as ConstantsClass from './Constants'


import {
    Route,
    NavLink,
    Router
  } from "react-router-dom";
  import Home from "./Home";
  import Stuff from "./Stuff";
  import Contact from "./Contact";

  import PrivateRoute from './_components/PrivateRoute'
  import LoginPage from './LoginPage'
  import { history } from './_helpers/history'
  import HomePage from './HomePage'
  import authenticationService from './_services/authenticationService'
  import DTappls from './_components/DTappls'
  import Monitor from './Monitor'




class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

    renewJWT=()=>{
        this.state.currentUser&&(authenticationService.jwtRenew()); 
    }

    componentDidMount() {
        console.log('App.js: showing the message in componentDiDMount'); 
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
        console.log('App.js: showing the message in componentDiDMount after call authenticationService'); 
        this.interval=setInterval(() => {
            this.renewJWT();
        }, 3000);
        //this.renewJWT();
    }

    logout() {
        console.log('App.js: logout clicked!'); 
        authenticationService.logout();
        history.push('/BillyDev_Demo/login');
    }


  render() {
    const { currentUser } = this.state;

      if(currentUser && currentUser !== 'null' && currentUser !== 'undefined'){
        console.log('App.js: current user logged in, currentUser is:'+currentUser); 
        return (
            <Router history={history}>
                 <div>
                   <h1>Simple SPA</h1>
         
                  { }
                   <ul className="header">
                     <li><NavLink exact to={ConstantsClass.RELATIVE_PATH}>UserInfo</NavLink></li>
                     <li><NavLink to={ConstantsClass.RELATIVE_PATH+"/home"}>Home</NavLink></li>
                     <li><NavLink to={ConstantsClass.RELATIVE_PATH+"/stuff"}>Stuff</NavLink></li>
                     <li><NavLink to={ConstantsClass.RELATIVE_PATH+"/contact"}>Contact</NavLink></li>
                     <li><NavLink to={ConstantsClass.RELATIVE_PATH+"/dtapp"}>DesignTime</NavLink></li>
                     <li><NavLink to={ConstantsClass.RELATIVE_PATH+"/monitor"}>Monitor</NavLink></li>
                     <li><a onClick={this.logout} className="nav-item nav-link">Logout</a></li>
                   </ul>
                  {/* } */}
                   <div className="content">           
                     <PrivateRoute exact path={ConstantsClass.RELATIVE_PATH} component={HomePage} />
                     <PrivateRoute path={ConstantsClass.RELATIVE_PATH+"/home"} component={Home}/>
                     <PrivateRoute path={ConstantsClass.RELATIVE_PATH+"/stuff"} component={Stuff}/>
                     <PrivateRoute path={ConstantsClass.RELATIVE_PATH+"/contact"} component={Contact}/> 
                     <PrivateRoute path={ConstantsClass.RELATIVE_PATH+"/dtapp"} component={DTappls}/>
                     <PrivateRoute path={ConstantsClass.RELATIVE_PATH+"/monitor"} component={Monitor} />
                     <Route path={ConstantsClass.RELATIVE_PATH+"/login"} component={LoginPage} />
                     <h3>This is just a test for login user</h3>
                   </div>
                 </div>
              </Router>
        )
     
    }else{
        console.log('App.js: current user NOT logged in'); 
        return (
        <Router history={history}>
                <div>
                  <h1>Simple SPA</h1>
                  <div className="content">           
                    <PrivateRoute exact path={ConstantsClass.RELATIVE_PATH} component={HomePage} />
                    <PrivateRoute  path={ConstantsClass.RELATIVE_PATH+"/home"} component={Home}/>
                    <PrivateRoute path={ConstantsClass.RELATIVE_PATH+"/stuff"} component={Stuff}/>
                    <PrivateRoute path={ConstantsClass.RELATIVE_PATH+"/contact"} component={Contact}/> 
                    <PrivateRoute path={ConstantsClass.RELATIVE_PATH+"/dtapp"} component={DTappls}/>
                    <PrivateRoute path={ConstantsClass.RELATIVE_PATH+"/monitor"} component={Monitor} />
                    <Route path={ConstantsClass.RELATIVE_PATH+"/login"} component={LoginPage} />
                    <h3>This is just a test for not login</h3>
                  </div>
                </div>
             </Router>
        )
    };
  }
}

export default App;