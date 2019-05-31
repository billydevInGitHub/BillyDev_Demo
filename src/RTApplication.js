import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import { rejects } from 'assert';


function job_state_to_color(state ){
	if(state=="01"){
		return "yellow";
	}else if(state=="02"){
		return "pink";
	}else if(state=="10"){
		return "green";
	}else if(state=="11"){
		return "red";
	}else if(state=="19"){
		return "orange";
	}else if(state=="20"){
		return "blue";
	}else if(state=="30"){
		return "gray";
	};
	return "black";
}

class RTApplication extends React.Component {

    constructor(props){
        super(props);
     }


    componentDidMount=()=>{
            this.createChart();
    }

    componentDidUpdate=()=>{
        this.createChart();
    }

 

    createChart=()=>{

        var CANVAS_WIDTH = 1000 
        const CANVAS_HEIGHT = 800;  
        const MODEL_CANVAS_WIDTH=2000;
        
        const XOFFSET=this.props.xoffset;
        const YOFFSET=this.props.yoffset; 
        const ZOOM=this.props.zoom; 
        console.log('RTApplication.js  within createChart  XOFFSET is: '+XOFFSET);

        const node = this.node
        const allScale = scaleLinear()
                             .domain([0, MODEL_CANVAS_WIDTH])
                             .range([0, CANVAS_WIDTH*ZOOM]);
       
    /* for the line part */


    select(node)
    .selectAll("line")
    .data(this.props.datasetForLine)
    .enter()
    .append("line")


    select(node)
    .selectAll("line")
    .data(this.props.datasetForLine)
    .exit()
    .remove()

    select(node)
        .selectAll("line")
        .data(this.props.datasetForLine)
        .attr("stroke", "black")
        .attr("x1", function(d) {
                return allScale(d['x1'])+XOFFSET;
        })
        .attr("y1", function(d) {
                return allScale(d['y1'])+YOFFSET
        })
        .attr("x2", function(d) {
                return allScale(d['x2'])+XOFFSET
        })
        .attr("y2", function(d) {
                    return allScale(d['y2'])+YOFFSET		
        })
        .attr("marker-end",function(d) {
                    if(d['hasArrow']=="A") {
                        return "url(#arrow)"
                    }else{
                        return ""
                    }		
        });

    /* for rect part */    
        select(node)
        .selectAll('rect')
        .data(this.props.datasetForRect)
        .enter()
        .append('rect')
     
     select(node)
        .selectAll('rect')
        .data(this.props.datasetForRect)
        .exit()
        .remove()



    select(node)
    .selectAll('rect')
    .data(this.props.datasetForRect)
    .attr("x", function(d) {
           // console.log('RTApplication.js  within createChart  d[x] is: '+d['x']);
                return allScale(d['x'])+XOFFSET
        })
        .attr("y", function(d) {
                return allScale(d['y'])+YOFFSET
        })
        .attr("width", function(d) {
                return allScale(d['width'])
        })
        .attr("height", function(d) {
                    return allScale(d['height'])	
        })
        .style("fill",  function(d) {
            return job_state_to_color(d['state']); 
        })
        .style("stroke", "black");
        // .on('click', function(d,i) {
        //     console.log("mouse on", i);
        //     //alert("job name is"+d['job_name']);
        //     shows_job_details(d['job_name']); 
        //     })
        // .on('mouseover', function(d,i) {
        //     console.log("mouse on", i);
        //     //alert("job name is"+d['job_name']);
        //     shows_job_details(d['job_name']); 
        //     });

        /* text part */
        
    select(node)
        .selectAll("text")
        .data(this.props.datasetForRect)
        .enter()
        .append("text")


        select(node)
        .selectAll("text")
        .data(this.props.datasetForRect)
        .exit()
        .remove()

        select(node)
        .selectAll("text")
        .data(this.props.datasetForRect)
        .text(function(d) {return d['job_name']})
        .attr("x", function(d) {
                return allScale(d['x_job_name'])+XOFFSET
        })
        .attr("y", function(d) {
                return allScale(d['y_job_name'])+YOFFSET
        })
        .attr("text-anchor", "middle");
        // .on('mouseover', function(d,i) {
        //     console.log("mouse on", i);
        //     //alert("job name is"+d['job_name']);
        //     shows_job_details(d['job_name']); 
        //     });
        

    }
    render(){
        return (

            <svg ref={node => this.node = node}
                    width={1500} height={500}>
                    
            </svg>
             
        )
    }
}

export default RTApplication