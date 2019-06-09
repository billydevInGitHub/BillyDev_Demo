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
import AdminConsoleDesignDTApplication from './AdminConsoleDesignDTApplication'
import AdminConsoleMonitorRTApplFrame from './AdminConsoleMonitorRTApplFrame'
import AdminConsoleDesignSidebarMenu from './AdminConsoleDesignSidebarMenu'
import AdminConsoleConfigurationSidebarMenu from './AdminConsoleConfigurationSidebarMenu';
import AdminConsoleScheduleSidebarMenu from './AdminConsoleScheduleSidebarMenu'
import AdminConsoleMonitorSidebarMenu from './AdminConsoleMonitorSidebarMenu'
import AdminConsoleConfigurationMain from './AdminConsoleConfigurationMain'
import AdminConsoleScheduleEvents from './AdminConsoleScheduleEvents'


class AdminConsole extends React.Component{


    render(){
        return (
            <div className="content  border border-success" >
            <Container fluid className='border'>
                <Row>
                  <Col xs="1"   className='border'>
                    <Nav vertical>
                        <AdminConsoleConfigurationSidebarMenu />
                        <AdminConsoleDesignSidebarMenu />
                        <AdminConsoleScheduleSidebarMenu />
                        <AdminConsoleMonitorSidebarMenu />
                    </Nav>
                  </Col>
                  <Col xs="10"  className='border'> 
                    <PrivateRoute path={ConstantsClass.RELATIVE_PATH+"/adminconsole/configuration/config"} component={AdminConsoleConfigurationMain}/>
                    <PrivateRoute path={ConstantsClass.RELATIVE_PATH+"/adminconsole/design/dtapplications"} component={AdminConsoleDesignDTApplication}/>
                    <PrivateRoute path={ConstantsClass.RELATIVE_PATH+"/adminconsole/design/dtjobs"} component={AdminConsoleStuff}/>
                    <PrivateRoute path={ConstantsClass.RELATIVE_PATH+"/adminconsole/design/dtpreview"} component={AdminConsoleStuff}/>
                    <PrivateRoute path={ConstantsClass.RELATIVE_PATH+"/adminconsole/schedule/events"} component={AdminConsoleScheduleEvents}/>
                    <PrivateRoute path={ConstantsClass.RELATIVE_PATH+"/adminconsole/schedule/calendar"} component={AdminConsoleStuff}/>
                    <PrivateRoute path={ConstantsClass.RELATIVE_PATH+"/adminconsole/monitor/rtapplications"} component={AdminConsoleStuff}/>
                    <PrivateRoute path={ConstantsClass.RELATIVE_PATH+"/adminconsole/monitor/rtappldiagram"} component={AdminConsoleMonitorRTApplFrame}/>
                  </Col>
                </Row>

            </Container>
            </div>
        )
    }
}

export default AdminConsole