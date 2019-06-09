import React from 'react'
import PrivateRoute from './PrivateRoute'
import {
    Route,
    NavLink,
    Router
  } from "react-router-dom";
import { Container, Row, Col,Nav, NavItem } from 'reactstrap';

import * as ConstantsClass from '../_helpers/Constants'
import DashboardRealtimeOverviewDiagrams from './DashBoardRealtimeOverviewDiagrams'
import DashboardRealtimeSidebarMenu from './DashboardRealtimeSidebarMenu'



class Dashboard extends React.Component{


    render(){
        return (
            <div className="content  border border-success" >
            <Container fluid className='border'>
                <Row>
                  <Col xs="1"   className='border'>
                    <Nav vertical>
                        <DashboardRealtimeSidebarMenu />
                    </Nav>
                  </Col>
                  <Col xs="10"  className='border'> 
                    <PrivateRoute path={ConstantsClass.RELATIVE_PATH+"/dashboard/realtime/overview"} component={DashboardRealtimeOverviewDiagrams}/>
                  </Col>
                </Row>

            </Container>
            </div>
        )
    }
}

export default Dashboard