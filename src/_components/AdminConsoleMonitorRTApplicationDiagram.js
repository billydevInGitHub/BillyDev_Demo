import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import { rejects } from 'assert';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText  } from 'reactstrap';


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

function job_state_to_string(state ){
	if(state=="01"){
		return "01";
	}else if(state=="02"){
		return "02";
	}else if(state=="10"){
		return "10";
	}else if(state=="11"){
		return "11";
	}else if(state=="19"){
		return "19";
	}else if(state=="20"){
		return "20";
	}else if(state=="30"){
		return "30";
	};
	return "01";
}



class AdminConsoleMonitorRTApplicationDiagram extends React.Component {

    constructor(props){
        super(props);
        this.state={
            job_name:'test',
            job_state:'test_state'
        }
     }


    componentDidMount=()=>{
            this.createChart();
    }

    componentDidUpdate=()=>{
        this.createChart();
    }

    updateJobInfo=()=>{

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

        const shows_job_details=(name)=>{
            console.log( "RTApplication.js... within shows_job_details name:"+name);
        }                  
        
        const setjobinfo=(jobinfo)=>{
            this.setState({
                job_name:jobinfo.job_name,
                job_state:jobinfo.job_state
            })
        }
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
            .style("stroke", "black")
            .on('click', function(d,i) {
                console.log("mouse on", i);
                alert("job name is"+d['job_name']);
                shows_job_details(d['job_name']); 
                setjobinfo({
                    job_name:d['job_name'],
                    //job_state:(''+d['state'])
                    // state:job_state_to_color(d['state'])
                   //job_state:job_state_to_color(d['state'])
                   job_state:job_state_to_string(d['state'])
                })
                })
            .on('mouseover', function(d,i) {
                console.log("mouse on", i);
                //alert("job name is"+d['job_name']);
                shows_job_details(d['job_name']); 
                });

    }
    render(){
        return (
            <Row>
                <Col md='10'>
                    <div class="border border-secondary p-3" style={{height: '750px'}}>    
                        <svg ref={node => this.node = node}   width={1500} height={500}>                    
                        </svg>
                    </div>
                </Col>
                <Col md="2">
                    <Form>
                        <Row>
                            <Col md={12}>
                                <FormGroup>
                                <Label for="event_name">Job_Name</Label>
                                <Input type="text" name="job_name" id="job_name" value={this.state.job_name} placeholder=""/>
                                </FormGroup>
                                <FormGroup>
                                <Label for="dtapplicationName">Job State</Label>
                                <Input type="text" name="state" id="state" value={this.state.job_state}  placeholder="" />
                                </FormGroup>
                            </Col>
                        </Row>
                    <Row>
                        <Col md={8}></Col>
                        <Col md={2}>
                           <Button onClick={this.updateJobInfo}>Update</Button>
                        </Col>
                        <Col md={2}>
                        </Col>
                    </Row> 
                    </Form>   
                </Col>
            </Row>

        )
    }
}

export default AdminConsoleMonitorRTApplicationDiagram