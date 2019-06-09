import React from 'react';
import { UncontrolledCollapse, Button,  NavItem, } from 'reactstrap';
import {NavLink} from 'react-router-dom'
import * as ConstantsClass from '../_helpers/Constants'

const AdminConsoleConfigurationSidebarMenu = () => (
    <NavItem  className="pl-3 pb-3" >
        <NavLink  id="togglerConfig" >
            Config
        </NavLink>
        <UncontrolledCollapse toggler="#togglerConfig">
            <NavLink to={ConstantsClass.RELATIVE_PATH+"/adminconsole/configuration/config"}  className="nav-link" >Configuration</NavLink>
        </UncontrolledCollapse>
    </NavItem>
);

export default AdminConsoleConfigurationSidebarMenu;