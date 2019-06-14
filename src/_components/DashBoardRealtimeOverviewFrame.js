import React, { Component } from "react";
import DashboardRealtimeOverviewDiagramBarChart from './DashboardRealtimeOverviewDiagramBarChart'
import { Container, Row, Col } from 'reactstrap';
import {BarChart} from 'react-d3-components'
import DashboardRealtimeOverviewDiagramBrush from './DashBoardRealtimeOverviewDiagramBrush'
import DashBoardRealtimeOverviewDiagramScatterPlotWithTooltips from './DashBoardRealtimeOverviewDiagramScatterPlotWithTooltips'
import DashBoardRealtimeOverviewDiagramLineChartStrokeStyle from './DashBoardRealtimeOverviewDiagramLineChartStrokeStyle'
import DashBoardRealtimeOverviewDiagramStackedBarChart from './DashBoardRealtimeOverviewDiagramStackedBarChart'
import DashBoardRealtimeOverviewDiagramGroupedBarChart from './DashBoardRealtimeOverviewDiagramGroupedBarChart'
import DashBoardRealtimeOverviewDiagramAreaChart from './DashBoardRealtimeOverviewDiagramAreaChart'
import DashBoardRealtimeOverviewDiagramPieChart from './DashBoardRealtimeOverviewDiagramPieChart'
 
class DashboardRealtimeOverviewFrame extends Component {
  render() {
    let dataBarchar02 = [{
      label: 'somethingA',
      values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
    }];
    return (
        <Container>
          <Row>
            <Col md="4"><DashboardRealtimeOverviewDiagramBarChart data={[5,10,1,3]} size={[250,330]} /></Col>
            <Col md="4">
              <BarChart
                data={dataBarchar02}
                width={400}
                height={400}
                margin={{top: 10, bottom: 50, left: 50, right: 10}}/>
            </Col>
            <Col md="4" ><DashboardRealtimeOverviewDiagramBrush /></Col>
          </Row>
          <Row>
            <Col md="4" ><DashBoardRealtimeOverviewDiagramScatterPlotWithTooltips /></Col>
            <Col md="4" ><DashBoardRealtimeOverviewDiagramLineChartStrokeStyle /></Col>
            <Col md="4" ><DashBoardRealtimeOverviewDiagramStackedBarChart /></Col>
          </Row>
          <Row>
            <Col md="4" ><DashBoardRealtimeOverviewDiagramGroupedBarChart /></Col>
            <Col md="4" ><DashBoardRealtimeOverviewDiagramAreaChart /></Col>
            <Col md="4" ><DashBoardRealtimeOverviewDiagramPieChart /></Col>
          </Row>
      </Container>
    );
  }
}


 
export default DashboardRealtimeOverviewFrame;