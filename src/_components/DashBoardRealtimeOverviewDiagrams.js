import React, { Component } from "react";
import DashboardRealtimeOverviewDiagramBarChart from './DashboardRealtimeOverviewDiagramBarChart'
 
class DashboardRealtimeOverviewDiagram extends Component {
  render() {
    return (
      <div>
        <h2>This is dashboard</h2>
        <p>Mauris sem velit, vehicula eget sodales vitae,
        rhoncus eget sapien:</p>
        <ol>
          <li>Nulla pulvinar diam</li>
          <li>Facilisis bibendum</li>
          <li>Vestibulum vulputate</li>
          <li>Eget erat</li>
          <li>Id porttitor</li>
        </ol>
        <DashboardRealtimeOverviewDiagramBarChart data={[5,10,1,3]} size={[500,500]} />
      </div>
    );
  }
}
 
export default DashboardRealtimeOverviewDiagram;