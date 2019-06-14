import React, { Component } from "react";
import {LineChart, d3} from 'react-d3-components'
 
class DashBoardRealtimeOverviewDiagramLineChartStrokeStyle extends Component {

  constructor(props){
    super(props);
    this.tooltipScatter = this.tooltipScatter.bind(this)
    this.state={
      data: {label: '', values: [
        {x: 1, y: 1},
        {x: 2, y: 2},
        {x: 3, y: 0},
        {x: 4, y: 3},
        {x: 5, y: 2},
        {x: 6, y: 3},
        {x: 7, y: 4}
      ]}
    }
  }

  tooltipScatter(x,y){
    return "x: " + x + " y: " + y;
}

  render() {

    var dashFunc = function(label) {
      if (label == "somethingA") {
          return "4 4 4";
      }
      if (label == "somethingB") {
          return "3 4 3";
      }
  }

  var widthFunc = function(label) {
      if (label == "somethingA") {
          return "4";
      }
      if (label == "somethingB") {
          return "2";
      }
  }

  var linecapFunc = function(label) {
      if (label == "somethingA") {
          return "round";
      }
  }

  var tooltipLine = function(x, y) {
    return "x: " + x + " y: " + y;
};

    return (
      <div>
         <LineChart
                    data={this.state.data}
                    width={400}
                    height={400}
                    margin={{top: 10, bottom: 50, left: 50, right: 10}}
                    tooltipHtml={tooltipLine}
                    xAxis={{innerTickSize: 6, label: "x-label"}}
                    yAxis={{label: "y-label"}}
                    shapeColor={"red"}
                    stroke={{strokeDasharray: dashFunc, strokeWidth: widthFunc, strokeLinecap: linecapFunc}}
                    />
      </div>
    )
  }
}
 
export default DashBoardRealtimeOverviewDiagramLineChartStrokeStyle;