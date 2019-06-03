import React from 'react';
import { UncontrolledCollapse, Button,  NavItem, } from 'reactstrap';
import {NavLink} from 'react-router-dom'
import * as ConstantsClass from '../_helpers/Constants'

const AdminConsoleCollapSidebarMenu = () => (
    <NavItem  className="pl-3" >
        <NavLink  id="toggler" >
            Monitor Group
        </NavLink>
        <UncontrolledCollapse toggler="#toggler">
            <NavLink to={ConstantsClass.RELATIVE_PATH+"/adminconsole/monitor"}  className="nav-link" >Monitor</NavLink>
        </UncontrolledCollapse>
    </NavItem>
);

export default AdminConsoleCollapSidebarMenu;