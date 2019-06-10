import React from 'react';
import { UncontrolledCollapse, Button,  NavItem, Collapse } from 'reactstrap';
import {NavLink} from 'react-router-dom'
import * as ConstantsClass from '../_helpers/Constants'

class  DashboardRealtimeSidebarMenu extends React.Component{
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
                <NavLink  id="togglerDesign" onClick={this.toggle}>
                    Realtime{this.state.collapse? <i class="material-icons sidebar">remove</i>: <i class="material-icons sidebar">add</i>}
                </NavLink>
                <UncontrolledCollapse toggler="#togglerDesign">
                    <NavLink to={ConstantsClass.RELATIVE_PATH+"/dashboard/realtime/overview"}  className="nav-link" >RT Overview</NavLink>            
                </UncontrolledCollapse>
            </NavItem>
        )
    }
}
export default DashboardRealtimeSidebarMenu;