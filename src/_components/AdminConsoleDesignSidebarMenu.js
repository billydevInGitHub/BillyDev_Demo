import React from 'react';
import { UncontrolledCollapse, Button,  NavItem, } from 'reactstrap';
import {NavLink} from 'react-router-dom'
import * as ConstantsClass from '../_helpers/Constants'

const AdminConsoleDesignSidebarMenu = () => (
    <NavItem  className="pl-3 pb-3" >
        <NavLink  id="togglerDesign" >
            Design
        </NavLink>
        <UncontrolledCollapse toggler="#togglerDesign">
            <NavLink to={ConstantsClass.RELATIVE_PATH+"/adminconsole/design/dtapplications"}  className="nav-link" >DT Appl</NavLink>
            <NavLink to={ConstantsClass.RELATIVE_PATH+"/adminconsole/design/dtjobs"}  className="nav-link" >DT Jobs</NavLink>
            <NavLink to={ConstantsClass.RELATIVE_PATH+"/adminconsole/design/dtpreview"}  className="nav-link" >DT Preview</NavLink>
        </UncontrolledCollapse>
    </NavItem>
);

export default AdminConsoleDesignSidebarMenu;