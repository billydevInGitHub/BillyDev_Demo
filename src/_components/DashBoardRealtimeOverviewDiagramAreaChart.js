import React, { Component } from "react";
import {AreaChart} from 'react-d3-components'
 
class DashBoardRealtimeOverviewDiagramAreaChart extends Component {

  constructor(props){
    super(props);
    this.state={
      data:[
        {
        label: 'somethingA',
        values: [{x: 0, y: 2}, {x: 1.3, y: 5}, {x: 3, y: 6}, {x: 3.5, y: 6.5}, {x: 4, y: 6}, {x: 4.5, y: 6}, {x: 5, y: 7}, {x: 5.5, y: 8}]
        },
        {
        label: 'somethingB',
        values: [{x: 0, y: 3}, {x: 1.3, y: 4}, {x: 3, y: 7}, {x: 3.5, y: 8}, {x: 4, y: 7}, {x: 4.5, y: 7}, {x: 5, y: 7.8}, {x: 5.5, y: 9}]
        }
    ]
    }
  }



  render() {

  

    return (
      <div>
        <AreaChart
                data={this.state.data}
                width={400}
                height={400}
                yOrientation='right' // if you do not provide right default left orientation for yAxis will be used
                margin={{top: 10, bottom: 50, left: 50, right: 10}}/>
      </div>
    )
  }
}
 
export default DashBoardRealtimeOverviewDiagramAreaChart;