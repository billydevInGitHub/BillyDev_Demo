import React from 'react';
import { UncontrolledCollapse, Button,  NavItem, Collapse } from 'reactstrap';
import {NavLink} from 'react-router-dom'
import * as ConstantsClass from '../_helpers/Constants'

class AdminConsoleScheduleSidebarMenu extends React.Component{
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
            <NavLink  id="togglerSchedule"  onClick={this.toggle}>
                Schedule{this.state.collapse? <i class="material-icons sidebar">remove</i>: <i class="material-icons sidebar">add</i>}
            </NavLink>
            <Collapse isOpen={this.state.collapse}>
                <NavLink to={ConstantsClass.RELATIVE_PATH+"/adminconsole/schedule/events"}  className="nav-link" >Events</NavLink>
                <NavLink to={ConstantsClass.RELATIVE_PATH+"/adminconsole/schedule/calendar"}  className="nav-link" >Calendar</NavLink>
            </Collapse>
        </NavItem>
        )
    }
}

export default AdminConsoleScheduleSidebarMenu;