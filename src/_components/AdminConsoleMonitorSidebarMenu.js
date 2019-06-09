import React from 'react';
import { UncontrolledCollapse, Button,  NavItem, } from 'reactstrap';
import {NavLink} from 'react-router-dom'
import * as ConstantsClass from '../_helpers/Constants'

const AdminConsoleMonitorSidebarMenu = () => (
    <NavItem  className="pl-3 pb-3" >
        <NavLink  id="togglerMonitor" >
            Monitor
        </NavLink>
        <UncontrolledCollapse toggler="#togglerMonitor">
            <NavLink to={ConstantsClass.RELATIVE_PATH+"/adminconsole/monitor/rtapplications"}  className="nav-link" >RT Appl</NavLink>
            <NavLink to={ConstantsClass.RELATIVE_PATH+"/adminconsole/monitor/rtappldiagram"}  className="nav-link" >RT Appl Graph</NavLink>
        </UncontrolledCollapse>
    </NavItem>
);

export default AdminConsoleMonitorSidebarMenu;