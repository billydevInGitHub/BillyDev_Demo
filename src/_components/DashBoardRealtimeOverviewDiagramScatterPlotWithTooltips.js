import React, { Component } from "react";
import {ScatterPlot, d3} from 'react-d3-components'
 
class DashBoardRealtimeOverviewDiagramScatterPlotWithTooltips extends Component {

  constructor(props){
    super(props);
    this.tooltipScatter = this.tooltipScatter.bind(this)
    this.state={
      data: {label: '', values: [
        {x: 1, y: 1},
        {x: 2, y: 2},
        {x: 3, y: 0},
        {x: 6, y: 3},
        {x: 7, y: 2},
        {x: 10, y: 3},
        {x: 4, y: 4}
      ]},
      xScale: d3.time.scale().domain([new Date(2015, 2, 5), new Date(2015, 2, 26)]).range([0, 400 - 70]),
      xScaleBrush: d3.time.scale().domain([new Date(2015, 2, 5), new Date(2015, 2, 26)]).range([0, 400 - 70])
    }
  }

  tooltipScatter(x,y){
    return "x: " + x + " y: " + y;
}

  render() {
    return (
      <div>
          <ScatterPlot
                data={this.state.data}
                width={400}
                height={400}
                margin={{top: 10, bottom: 50, left: 50, right: 10}}
                tooltipHtml={this.tooltipScatter}
                xAxis={{label: "x-label"}}
                yAxis={{label: "y-label"}}/>
      </div>
    )
  }
}
 
export default DashBoardRealtimeOverviewDiagramScatterPlotWithTooltips;