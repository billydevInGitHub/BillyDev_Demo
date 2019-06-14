import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import eventService from '../_services/eventService'
import AdminConsoleDesignDTApplicationModalPopup from './AdminConsoleDesignDTApplicationModalPopup'
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText  } from 'reactstrap';


const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

let counter = 0;
function createData(name, calories, fat) {
  counter += 1;
  return { id: counter, name, calories, fat };
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class CustomPaginationActionsTable extends React.Component {
  state = {
    rows: [],
    page: 0,
    rowsPerPage: 5,
    currentRow:{},
    currentRowKey:null
  };


  rowSelected=(event_name)=>{
    this.setState({
      currentRow:this.state.rows.find(row=>{
        return (row.event_name==event_name)
      }),
      currentRowKey:event_name
    })
   }


  submitForm=()=>{
    console.log('DTappls.js  submitForm before formtype check , the formtype is: '+this.state.formtype);
    if(this.state.formtype=='create'){
      //call creation ajax
      console.log('DTappls.js  submitForm for create ...calling eventService ...');
      eventService.createNewDTApp({'appName':this.state.appNameOnEditing, 
                                   'appCreateUserId':this.state.appCreateUserIdOnEditing})
      .then((data)=>{
      //  console.log('DTappls.js  within submitForm after event service call, get the dt appl(appname) info back:'
      //          + (data.creator.endsWith('rr')?'good':'bad')+' appname is:'+ (data.appname=='rr'?'appgood':'appbad')); 
        console.log('DTappls.js  data is:'+JSON.stringify(data)); 
        this.setState({
          rows:[...this.state.rows, data]
        });
        this.setState({modalOpen:false});
      });

      //call back update rows
    }else if(this.state.formtype=='edit'){
      console.log('DTappls.js  submitForm for edit ...calling eventService ...');
      //call update ajax
      //call back update rows
      eventService.updateDTApp({'appl_id':this.state.idOnEditing,
                                'appName':this.state.appNameOnEditing, 
                                'appCreateUserId':this.state.appCreateUserIdOnEditing
                                 })
      .then((data)=>{
      //  console.log('DTappls.js  within submitForm after event service call, get the dt appl(appname) info back:'
      //          + (data.creator.endsWith('rr')?'good':'bad')+' appname is:'+ (data.appname=='rr'?'appgood':'appbad')); 
        console.log('DTappls.js  data updated  is:'+JSON.stringify(data)); 
        var tempRows=this.state.rows;
        // tempRows=tempRows.filter((row, id)=>{
        //    if(row.id==data.id){
        //     console.log('DTappls.js  within submit form, within filter ,get matched row id:'+row.id);
        //      //update edited row
        //      row=data;
        //    }
        //    return row;
        // })

        tempRows.forEach((row, i)=>{
          if(row.appl_id==data.appl_id){
            tempRows[i]=data;
          }
        })
        console.log('DTappls.js  within submit form, tempRows:'+tempRows);
        console.log(tempRows);
        this.setState({
          rows:tempRows,
          idOnEditing:data.appl_id
        });
        this.setState({modalOpen:false});
        console.log('DTappls.js  within submit form, end of submit form!!!');
      },
      (error)=>{
        this.setState({modalOpen:false});
        console.log('DTappls.js  within submit form, error in calling the API!!! error:'+error);
      });
    }//end of if
  } //end of submitForm

  deleteRow=(id)=>{
   
    const {rows}=this.state;
    eventService.deleteDTApp(id)
    .then((input)=>{
      console.log('DTappls.js  within deleteRow method id is:'+id); 
      this.setState({
             rows:rows.filter((row,i)=>{
              console.log('DTappls.js  within filter row.id:'+row.id+ ' id:' +id);
                            return !(row.id == id);  
                            //return i+1 != id; 
                          })
              
              });
      console.log('DTappls.js  about to delete the row ...'); 
    })
  }
  
  editRow=(index)=>{
    console.log('DTappls.js within editRow index is:'+index); 
    var tempRows=this.state.rows;
        tempRows.filter((row, id)=>{
           if(row.appl_id==index){
             this.setState({
              appNameOnEditing:row.appName,
              appCreateUserIdOnEditing:row.appCreateUserId,
              idOnEditing:row.appl_id
             })            
           }
           return row;
        })
    this.setState({
      modalOpen:true, 
      formtype:'edit',
      idOnEditing:index
    })

  }

  trigger=(currentRow)=>{
    console.log('AdminnConsoleScheduleEventes.js within trigger currentRow.event_name is:'+currentRow.event_name); 

    console.log(currentRow);

    eventService.triggerApp({'event_id':1,'dtappname':currentRow.dtappname,
    'event_name':currentRow.event_name
      })
    .then(()=>{
      this.props.history.push('/BillyDev_Demo/adminconsole/monitor/rtappldiagram');
    })
  }

  updateAppUnderEditing=(event)=>{
    const {name, value}=event.target;
    this.setState({
      [name]:value
    })
  }

  componentDidMount() {
    console.log('AdminConsoleScheduleEvents.js is about to call the event service within componentDidMount...'); 
    eventService.getAllEvents().then(rows=>this.setState({rows}));
}

  handleChangePage = (event, page) => {
    this.setState({ 
      page,
      currentRowKey:null
     });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page, currentRow,currentRowKey } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    console.log("currentrow");
    console.log(currentRow); 

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                <TableRow key={row.appl_id}>
                  <TableCell align="center"><Input type="radio" checked={currentRowKey==row.event_name?true:false} name="radioSelectRow" id="checkboxRowSelect" 
                               onClick={()=>{this.rowSelected(row.event_name)}} /></TableCell>
                  <TableCell component="th" scope="row">
                    {row.event_name}
                  </TableCell>
                  <TableCell align="right">{row.dtappname}</TableCell>
                  <TableCell align="right">{row.next_scheduled_time}</TableCell>
                  <TableCell align="right">{'place holder'}</TableCell>
                  <TableCell align="right"> <input
                    type='button' 
                    value='Delete'  
                    onClick={()=>{this.deleteRow(row.event_name)}} 
                  /></TableCell> 
                  <TableCell align="right"> <input
                    type='button' 
                    value='Edit'  
                    onClick={()=>{this.editRow(row.event_name)}} 
                  /></TableCell> 
                  <TableCell align="right"> <input
                    type='button' 
                    value='Trigger'  
                    onClick={()=>{this.trigger(row.event_name)}} 
                  /></TableCell> 
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        <div class="border border-secondary p-3">          
        {/* <form>
              <div className="form-group">
                <label>Event Name </label><br />
                <input className="form-control"
                type='text' 
                id='event_name'
                name='event_name'
                 value={currentRow.event_name}
                // value='testValue'
                />
                <input  className="form-control"
                type='button'
                value='Submit'
                onClick={this.submitForm}
                />
              </div>
            </form> */}
        {currentRowKey&& <Form>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="event_name">Event_Name</Label>
                  <Input type="text" name="event_name" id="event_name" value={currentRow.event_name} placeholder=""/>
                </FormGroup>
              </Col>
            </Row>
            <Row >
              <Col md={4}  >
                <FormGroup>
                  <Label for="dtapplicationName">Desigin Time Application Name</Label>
                  <Input type="text" name="dtapplicationName" id="dtapplicationName" value={currentRow.dtappname}  placeholder="" />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                    <Label for="state">State</Label>
                    <Input type="text" name="state" id="state" value={currentRow.state} placeholder="" />
                </FormGroup>              
              </Col>
              <Col md={4} >
                  <FormGroup>
                    <Label for="eventCreateTime">Event Create Time</Label>
                    <Input type="text" name="eventCreateTime" id="eventCreateTime" placeholder=""/>
                  </FormGroup>
              </Col>
            </Row>
          <Row>
            <Col md={8}></Col>
            <Col md={2}>
              <Button >Apply</Button>
            </Col>
            <Col md={2}>
              <Button onClick={()=>{this.trigger(currentRow)}}>Trigger</Button>
            </Col>
          </Row> 
        </Form>   
        }         
      </div>
      </Paper>
    );
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomPaginationActionsTable);
