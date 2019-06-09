import React from 'react';
import { UncontrolledCollapse, Button,  NavItem, } from 'reactstrap';
import {NavLink} from 'react-router-dom'
import * as ConstantsClass from '../_helpers/Constants'

const DashboardRealtimeSidebarMenu = () => (
    <NavItem  className="pl-3 pb-3" >
        <NavLink  id="togglerDesign" >
            Realtime
        </NavLink>
        <UncontrolledCollapse toggler="#togglerDesign">
            <NavLink to={ConstantsClass.RELATIVE_PATH+"/dashboard/realtime/overview"}  className="nav-link" >RT Overview</NavLink>            
        </UncontrolledCollapse>
    </NavItem>
);

export default DashboardRealtimeSidebarMenu;