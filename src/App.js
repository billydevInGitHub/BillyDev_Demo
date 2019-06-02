import React, { Component } from 'react';
import { createStore } from 'redux'
import {
    Route,
    NavLink,
    Router
  } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

import * as ConstantsClass from './_helpers/Constants'
import { history } from './_helpers/history'
import PrivateRoute from './_components/PrivateRoute'
import LoginPage from './LoginPage'
import authenticationService from './_services/authenticationService'

import HomePage from './_components/HomePage'
import DashBoard from "./_components/DashBoard"
import AdminConsole from './_components/AdminConsole'






function counter(state = 0, action) {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1
      case 'DECREMENT':
        return state - 1
      default:
        return state
    }
  }


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


        let store = createStore(counter);
        store.subscribe(() => console.log(store.getState()))
        // The only way to mutate the internal state is to dispatch an action.
        // The actions can be serialized, logged or stored and later replayed.
        store.dispatch({ type: 'INCREMENT' })
        // 1
        store.subscribe(() => console.log('app.js componentDidMount, redux after increment:'+store.getState()));

        store.dispatch({ type: 'INCREMENT' })
        store.subscribe(() => console.log('app.js componentDidMount, redux after increment:'+store.getState()));
        // 2
        store.dispatch({ type: 'DECREMENT' })
        // 1
        store.subscribe(() => console.log('app.js componentDidMount, redux after decrement:'+store.getState()));  
        store.subscribe(() => console.log('app.js componentDidMount, redux after decrement:'+store.getState()));  
        store.subscribe(() => console.log('app.js componentDidMount, redux after decrement:'+store.getState()));  
        store.subscribe(() => console.log('app.js componentDidMount, redux after decrement:'+store.getState()));  
        store.dispatch({ type: 'DECREMENT' })
    }

    logout() {
        console.log('App.js: logout clicked!'); 
        authenticationService.logout();
        history.push('/BillyDev_Demo/login');
    }


  render() {
    const { currentUser } = this.state;

      // if(currentUser && currentUser !== 'null' && currentUser !== 'undefined'){
        console.log('App.js: current user logged in, currentUser is:'+currentUser); 
        return (
         <Router history={history}>
           <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark ml-auto">
             <NavbarBrand href="/">Orange Process Management</NavbarBrand>
             <Nav className="ml-auto" navbar> 
              <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                  <NavLink exact to={ConstantsClass.RELATIVE_PATH}   className="nav-link" >Home</NavLink>
                </li>
                <li class="nav-item">
                  <NavLink to={ConstantsClass.RELATIVE_PATH+"/dashboard"}  className="nav-link" >DashBoard</NavLink>
                </li>
                <li class="nav-item">
                  <NavLink to={ConstantsClass.RELATIVE_PATH+"/adminconsole"}  className="nav-link" >AdminConsole</NavLink>
                </li>
              </ul>
              <UncontrolledDropdown nav inNavbar  className="navbar-dark bg-dark">
                <DropdownToggle nav caret>
                  User Info
                </DropdownToggle>
                <DropdownMenu right className="navbar-dark bg-dark">
                  <DropdownItem>
                     <a onClick={this.logout} className="nav-item nav-link">User Info</a>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                     <a onClick={this.logout} className="nav-item nav-link">Logout</a>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
           </Navbar>
{/*           <div className="content  border border-primary">            */}
              <PrivateRoute exact path={ConstantsClass.RELATIVE_PATH} component={HomePage} />
              <PrivateRoute path={ConstantsClass.RELATIVE_PATH+"/dashboard"} component={DashBoard}/>
              <PrivateRoute path={ConstantsClass.RELATIVE_PATH+"/adminconsole"}  component={AdminConsole} />
              <Route path={ConstantsClass.RELATIVE_PATH+"/login"} component={LoginPage} />
  {/*           </div> */}
        </Router>
        )
     
    // }else{
    //     console.log('App.js: current user NOT logged in'); 
    //     return (
    //     <Router history={history}>
    //             <div>
    //               <div className="content">           
    //                 <PrivateRoute exact path={ConstantsClass.RELATIVE_PATH} component={HomePage} />
    //                 <PrivateRoute  path={ConstantsClass.RELATIVE_PATH+"/home"} component={Home}/>
    //                 <PrivateRoute path={ConstantsClass.RELATIVE_PATH+"/stuff"} component={Stuff}/>
    //                 <PrivateRoute path={ConstantsClass.RELATIVE_PATH+"/contact"} component={Contact}/> 
    //                 <PrivateRoute path={ConstantsClass.RELATIVE_PATH+"/dtapp"} component={DTappls}/>
    //                 <PrivateRoute path={ConstantsClass.RELATIVE_PATH+"/monitor"} component={Monitor} />
    //                 <Route path={ConstantsClass.RELATIVE_PATH+"/login"} component={LoginPage} />
    //                 <h3>This is just a test for not login</h3>
    //               </div>
    //             </div>
    //          </Router>
    //     )
    // };
   }
      
}

export default App;