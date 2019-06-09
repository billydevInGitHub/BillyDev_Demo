import React from 'react';
import { UncontrolledCollapse, Button,  NavItem, } from 'reactstrap';
import {NavLink} from 'react-router-dom'
import * as ConstantsClass from '../_helpers/Constants'

const AdminConsoleScheduleSidebarMenu = () => (
    <NavItem  className="pl-3 pb-3" >
        <NavLink  id="togglerSchedule" >
            Schedule
        </NavLink>
        <UncontrolledCollapse toggler="#togglerSchedule">
            <NavLink to={ConstantsClass.RELATIVE_PATH+"/adminconsole/schedule/events"}  className="nav-link" >Events</NavLink>
            <NavLink to={ConstantsClass.RELATIVE_PATH+"/adminconsole/schedule/calendar"}  className="nav-link" >Calendar</NavLink>
        </UncontrolledCollapse>
    </NavItem>
);

export default AdminConsoleScheduleSidebarMenu;