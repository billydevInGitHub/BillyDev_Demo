import React from 'react'
import PrivateRoute from './PrivateRoute'
import {
    Route,
    NavLink,
    Router
  } from "react-router-dom";
import { Container, Row, Col,Nav, NavItem } from 'reactstrap';

import * as ConstantsClass from '../_helpers/Constants'
import AdminConsoleStuff from './AdminConsoleStuff'
import DTappls from './DTappls'
import Monitor from './Monitor'

class AdminConsole extends React.Component{


    render(){
        return (
            <div className="content  border border-success" >
            <Container fluid className='border'>
                <Row>
                  <Col xs="1"   className='border'>
                    <Nav vertical>
                        <NavItem>
                            <NavLink to={ConstantsClass.RELATIVE_PATH+"/adminconsole/event"}  className="nav-link" >Events</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to={ConstantsClass.RELATIVE_PATH+"/adminconsole/monitor"}  className="nav-link" >Monitor</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to={ConstantsClass.RELATIVE_PATH+"/adminconsole/monitor"}  className="nav-link" >Editor</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to={ConstantsClass.RELATIVE_PATH+"/adminconsole/monitor"}  className="nav-link" >Editor</NavLink>
                        </NavItem>
                    </Nav>
                  </Col>
                  <Col xs="8"  className='border'> 
                    <PrivateRoute path={ConstantsClass.RELATIVE_PATH+"/adminconsole/adminconsoleStuff"} component={AdminConsoleStuff}/>
                    <PrivateRoute path={ConstantsClass.RELATIVE_PATH+"/adminconsole/event"} component={DTappls}/>
                    <PrivateRoute path={ConstantsClass.RELATIVE_PATH+"/adminconsole/monitor"} component={Monitor}/>
                  </Col>
                </Row>

            </Container>
            </div>
        )
    }
}

export default AdminConsole