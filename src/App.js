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
import DashBoard from "./_components/Dashboard"
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
        }, 3000000);


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
             <NavbarBrand href="/">Orange Process Management<i class="material-icons orange600">bubble_chart</i></NavbarBrand>
             {currentUser&&
                <Nav className="ml-auto" navbar> 
                  <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                      <NavLink exact to={ConstantsClass.RELATIVE_PATH}   className="nav-link" ><i class="material-icons md-48">home</i>Home</NavLink>
                    </li>
                    <li class="nav-item">
                      <NavLink to={ConstantsClass.RELATIVE_PATH+"/dashboard"}  className="nav-link" ><i class="material-icons">dashboard</i>DashBoard</NavLink>
                    </li>
                    <li class="nav-item">
                      <NavLink to={ConstantsClass.RELATIVE_PATH+"/adminconsole"}  className="nav-link" ><i class="material-icons">brightness_auto</i>AdminConsole</NavLink>
                    </li>
                  </ul>
                  <UncontrolledDropdown nav inNavbar  className="navbar-dark bg-dark">
                    <DropdownToggle nav caret>
                    <i class="material-icons">people</i>Users&Roles </DropdownToggle>
                    <DropdownMenu right className="navbar-dark bg-dark">
                      <DropdownItem>
                        <a onClick={this.logout} className="nav-item nav-link"><i class="material-icons">account_box</i>User Info</a>
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                        <a onClick={this.logout} className="nav-item nav-link"><i class="material-icons">clear</i>Logout</a></DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
              </Nav>
            }
           </Navbar>
          <PrivateRoute exact path={"/"} component={HomePage} />
          <PrivateRoute exact path={ConstantsClass.RELATIVE_PATH} component={HomePage} />
          <PrivateRoute path={ConstantsClass.RELATIVE_PATH+"/dashboard"} component={DashBoard}/>
          <PrivateRoute path={ConstantsClass.RELATIVE_PATH+"/adminconsole"}  component={AdminConsole} />
          <Route path={ConstantsClass.RELATIVE_PATH+"/login"} component={LoginPage} />
          <div className="pt-5 text-center"> @2019 BillyDev All Rights reserved</div>
        </Router>
        )
   }
      
}

export default App;