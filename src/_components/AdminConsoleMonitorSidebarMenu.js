import React, {Component} from 'react';
import { UncontrolledCollapse, Button, Collapse, NavItem, } from 'reactstrap';
import {NavLink} from 'react-router-dom'
import * as ConstantsClass from '../_helpers/Constants'


class AdminConsoleMonitorSidebarMenu extends Component {
        constructor(props) {
          super(props);
          this.state = { collapse: false };
        }      
        toggle=()=>{
          this.setState(state => ({ collapse: !state.collapse }));
        } 

    render(){
        return(
            <NavItem  className="pl-3 pb-3" >
                <NavLink  id="togglerMonitor" onClick={this.toggle}>
                    Monitor{this.state.collapse? <i class="material-icons sidebar">remove</i>: <i class="material-icons sidebar">add</i>}
                </NavLink>
                <Collapse isOpen={this.state.collapse}>
                    <UncontrolledCollapse toggler="#togglerMonitor">
                        <NavLink to={ConstantsClass.RELATIVE_PATH+"/adminconsole/monitor/rtapplications"}  className="nav-link" >RT Appl</NavLink>
                        <NavLink to={ConstantsClass.RELATIVE_PATH+"/adminconsole/monitor/rtappldiagram"}  className="nav-link" >RT Appl Graph</NavLink>
                    </UncontrolledCollapse>                    
                </Collapse>
            </NavItem>
        )
    }
}

export default AdminConsoleMonitorSidebarMenu;