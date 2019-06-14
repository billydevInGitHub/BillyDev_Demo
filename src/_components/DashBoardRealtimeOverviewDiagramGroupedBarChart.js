import React, { Component } from "react";
import {BarChart} from 'react-d3-components'
 
class DashBoardRealtimeOverviewDiagramGroupedBarChart extends Component {

  constructor(props){
    super(props);
    this.state={
      data: [
        {
        label: 'somethingA',
        values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
        },
        {
        label: 'somethingB',
        values: [{x: 'SomethingA', y: 6}, {x: 'SomethingB', y: 8}, {x: 'SomethingC', y: 5}]
        },
        {
        label: 'somethingC',
        values: [{x: 'SomethingA', y: 6}, {x: 'SomethingB', y: 8}, {x: 'SomethingC', y: 5}]
        }
    ]
    }
  }



  render() {

  

    return (
      <div>
        <BarChart
                groupedBars
                data={this.state.data}
                width={400}
                height={400}
                margin={{top: 10, bottom: 50, left: 50, right: 10}}/>
      </div>
    )
  }
}
 
export default DashBoardRealtimeOverviewDiagramGroupedBarChart;