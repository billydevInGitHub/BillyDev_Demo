import React from 'react'
import RTApplication from './RTApplication'
import BarChart from './BarChart';
import monitorService from '../_services/monitorService';

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }


class Monitor extends React.Component{

    constructor(props) {
        super(props);
        this.initialstate = { 
            seconds: 0,
            data:[rand(),10,rand(),3],
            size:[rand()+200,200],
            datasetForRect:[
                {'x':568,'y':185,'width':25,'height':25,'x_job_name':580,'y_job_name':230,'job_name':'Unix_job2'},{'x':488,'y':185,'width':25,'height':25,'x_job_name':500,'y_job_name':230,'job_name':'Unix_job1'},{'x':408,'y':185,'width':25,'height':25,'x_job_name':420,'y_job_name':230,'job_name':'Unix_job4'},{'x':528,'y':345,'width':25,'height':25,'x_job_name':540,'y_job_name':390,'job_name':'Unix_job3'},{'x':488,'y':25,'width':25,'height':25,'x_job_name':500,'y_job_name':70,'job_name':'Unix_start'},{'x':408,'y':345,'width':25,'height':25,'x_job_name':420,'y_job_name':390,'job_name':'Unix_job5'},{'x':488,'y':505,'width':25,'height':25,'x_job_name':500,'y_job_name':550,'job_name':'Unix_end'}
            ],            
            datasetForLine:[
               {'x1':500,'y1':210,'x2':540,'y2':342,'hasArrow':'A'},{'x1':500,'y1':50,'x2':420,'y2':182,'hasArrow':'A'},{'x1':580,'y1':210,'x2':540,'y2':342,'hasArrow':'A'},{'x1':420,'y1':210,'x2':420,'y2':342,'hasArrow':'A'},{'x1':500,'y1':50,'x2':580,'y2':182,'hasArrow':'A'},{'x1':500,'y1':50,'x2':500,'y2':182,'hasArrow':'A'},{'x1':540,'y1':370,'x2':500,'y2':502,'hasArrow':'A'},{'x1':420,'y1':370,'x2':500,'y2':502,'hasArrow':'A'}
            ],
            xoffset:0,
            yoffset:0,
            zoom:1
         };
        this.state=this.initialstate;
      }

    tick() {
        // this.setState(prevState => ({
        //   seconds: prevState.seconds + 1,
        //   data:[rand(),10,rand(),3],
        //   size:[rand()+200,200],
        //   datasetForRect:[
        //     {'x':568,'y':185,'width':25,'height':25,'x_job_name':580,'y_job_name':230,'job_name':'Unix_job2'},{'x':488,'y':185,'width':25,'height':25,'x_job_name':500,'y_job_name':230,'job_name':'Unix_job1'},{'x':408,'y':185,'width':25,'height':25,'x_job_name':420,'y_job_name':230,'job_name':'Unix_job4'},{'x':528,'y':345,'width':25,'height':25,'x_job_name':540,'y_job_name':390,'job_name':'Unix_job3'},{'x':488,'y':25,'width':25,'height':25,'x_job_name':500,'y_job_name':70,'job_name':'Unix_start'},{'x':408,'y':345,'width':25,'height':25,'x_job_name':420,'y_job_name':390,'job_name':'Unix_job5'},{'x':488,'y':505,'width':25,'height':25,'x_job_name':500,'y_job_name':550,'job_name':'Unix_end'}
        // ],
        // datasetForLine:[
        //     {'x1':500,'y1':210,'x2':540,'y2':342,'hasArrow':'A'},{'x1':500,'y1':50,'x2':420,'y2':182,'hasArrow':'A'},{'x1':580,'y1':210,'x2':540,'y2':342,'hasArrow':'A'},{'x1':420,'y1':210,'x2':420,'y2':342,'hasArrow':'A'},{'x1':500,'y1':50,'x2':580,'y2':182,'hasArrow':'A'},{'x1':500,'y1':50,'x2':500,'y2':182,'hasArrow':'A'},{'x1':540,'y1':370,'x2':500,'y2':502,'hasArrow':'A'},{'x1':420,'y1':370,'x2':500,'y2':502,'hasArrow':'A'}
        //  ],
        // }));
        monitorService.getRTAppInfo()
        .then(ajaxData=>{
            this.setState({
                datasetForRect:ajaxData.datasetForRect,
                dataSetForLine:ajaxData.dataSetForLine
            })
        })

    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 10000000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    moveDrawLeft=()=>{
        this.setState({
            xoffset: this.state.xoffset-10
        })
    }

    moveDrawRight=()=>{
        this.setState({
            xoffset: this.state.xoffset+10
        })
    }

    moveDrawTop=()=>{
        this.setState({
            yoffset: this.state.yoffset-10
        })
    }

    moveDrawBottom=()=>{
        this.setState({
            yoffset: this.state.yoffset+10
        })
    }

    reset=()=>{
        this.setState({
            xoffset:0,
            yoffset:0,
            zoom:1
        })
    }

    zoomIn=()=>{
        this.setState({
            zoom:this.state.zoom*2,
        })
    }

    zoomOut=()=>{
        this.setState({
            zoom:this.state.zoom/2,
        })
    }
    render(){
        return(
        <div>
            <h1> this is for monitoring component with D3 charts; </h1>
            <div>
                Seconds: {this.state.seconds}                
            </div>
            <div id="buttons">
                 <button id="zoomIn" onClick={this.zoomIn}>Zoom In</button>
                 <button id="zoomOut" onClick={this.zoomOut}>Zoom Out</button>
                 <button id="moveLeft" onClick={this.moveDrawLeft}>Move left</button>
                 <button id="moveRight" onClick={this.moveDrawRight}>Move right</button>
                 <button id="moveTop" onClick={this.moveDrawTop}>Move top</button>
                 <button id="moveBottom" onClick={this.moveDrawBottom}>Move bottom</button>
                 <button id="reSet" onClick={this.reset}>Reset</button>
            </div>
            <div className="monitorview">
         
                <RTApplication 
                datasetForRect={this.state.datasetForRect}  
                datasetForLine={this.state.datasetForLine} 
                xoffset={this.state.xoffset} 
                yoffset={this.state.yoffset} 
                zoom={this.state.zoom} 
                 />
                    {/* <BarChart data={this.state.data} size={this.state.size} /> */}
            </div>
        </div>
        )
    }
}

export default Monitor 