import React from 'react';
import { UncontrolledCollapse, Button,  NavItem, Collapse} from 'reactstrap';
import {NavLink} from 'react-router-dom'
import * as ConstantsClass from '../_helpers/Constants'

class AdminConsoleConfigurationSidebarMenu extends React.Component{
    constructor(props) {
        super(props);
        this.state = { collapse: false };
      }      
      toggle=()=>{
        this.setState(state => ({ collapse: !state.collapse }));
      } 


    render(){
        return (
            <NavItem  className="pl-3 pb-3" >
                <NavLink  id="togglerConfig" onClick={this.toggle} >
                    Config{this.state.collapse? <i class="material-icons sidebar">remove</i>: <i class="material-icons sidebar">add</i>}
                </NavLink>
                <Collapse isOpen={this.state.collapse}>
                    <NavLink to={ConstantsClass.RELATIVE_PATH+"/adminconsole/configuration/config"}  className="nav-link" >Configuration</NavLink>
                </Collapse>
            </NavItem>
        )
    }
}
export default AdminConsoleConfigurationSidebarMenu;