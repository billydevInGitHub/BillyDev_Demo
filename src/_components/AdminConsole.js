import React from 'react'
import PrivateRoute from './PrivateRoute'
import * as ConstantsClass from '../Constants'
import AdminConsoleStuff from './AdminConsoleStuff'
import {
    Route,
    NavLink,
    Router
  } from "react-router-dom";



class AdminConsole extends React.Component{


    render(){
        return (
            <div>
                <h1>test admin console</h1>
                <NavLink to={ConstantsClass.RELATIVE_PATH+"/adminconsole/adminconsoleStuff"}  className="nav-link" >AdminConsoleStuff</NavLink>
                <AdminConsoleStuff />
                <PrivateRoute path={ConstantsClass.RELATIVE_PATH+"/adminconsole/adminconsoleStuff"} component={AdminConsoleStuff}/>
                {/* <PrivateRoute path={ConstantsClass.RELATIVE_PATH+"/stuff"} component={Stuff}/> */}
            </div>
        )
    }
}

export default AdminConsole