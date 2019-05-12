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
import ModalPopup from './ModalPopup'


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
    //   createData('Cupcake', 305, 3.7),
    //   createData('Donut', 452, 25.0),
    //   createData('Eclair', 262, 16.0),
    //   createData('Frozen yoghurt', 159, 6.0),
    //   createData('Gingerbread', 356, 16.0),
    //   createData('Honeycomb', 408, 3.2),
    //   createData('Ice cream sandwich', 237, 9.0),
    //   createData('Jelly Bean', 375, 0.0),
    //   createData('KitKat', 518, 26.0),
    //   createData('Lollipop', 392, 0.2),
    //   createData('Marshmallow', 318, 0),
    //   createData('Nougat', 360, 19.0),
    //   createData('Oreo', 437, 18.0),
    // ].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
    page: 0,
    rowsPerPage: 5,
    modalOpen:false,
    idOnEditing:-1,
    //dtappUnderEditing:{}
    appnameOnEditing:'',
    creatorOnEditing:'',
    formtype:'create'
  };

  handleModalOpen = () => {
    console.log('DTappls.js  handleModalOpen ...open clicked...');
    this.setState({ 
      modalOpen: true,
      appnameOnEditing:'',
      creatorOnEditing:'',
      idOnEditing:-1,
      formtype:'create'

     });
  };

  handleModalClose=() => {
    console.log('DTappls.js  handleModalOpen ...close clicked...');
    this.setState({ modalOpen: false });
  };

  submitForm=()=>{
    console.log('DTappls.js  submitForm before formtype check , the formtype is: '+this.state.formtype);
    if(this.state.formtype=='create'){
      //call creation ajax
      console.log('DTappls.js  submitForm for create ...calling eventService ...');
      eventService.createNewDTApp({'appname':this.state.appnameOnEditing, 
                                   'creator':this.state.creatorOnEditing})
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
      eventService.updateDTApp({'id':this.state.idOnEditing,
                                'appname':this.state.appnameOnEditing, 
                                'creator':this.state.creatorOnEditing
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
          if(row.id==data.id){
            tempRows[i]=data;
          }
        })
        console.log('DTappls.js  within submit form, tempRows:'+tempRows);
        console.log(tempRows);
        this.setState({
          rows:tempRows,
          idOnEditing:data.id
        });
        this.setState({modalOpen:false});
        console.log('DTappls.js  within submit form, end of submit form!!!');
      });
    }
  }

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
           if(row.id==index){
             this.setState({
              appnameOnEditing:row.appname,
              creatorOnEditing:row.creator,
              idOnEditing:row.id
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

  trigger=(index)=>{
    console.log('DTappls.js within trigger index is:'+index); 
    this.setState({
      idOnEditing:index
    })
    console.log(this.state.rows);
    this.state.rows.forEach((row,id)=>{
      if(row.id==index){
        console.log('DTappls.js within this.state.rows.forEach, index matches row.id,  index is:'
         +index+' row.appnameOnEditing is:'+row.appname
         +' row.creatorOnEditing is:'+row.creator); 
        this.setState({
          appnameOnEditing:row.appname,
          creatorOnEditing:row.creator
        })
      }
    })

    eventService.triggerApp({'id':this.state.idOnEditing,
    'appname':this.state.appnameOnEditing, 
    'creator':this.state.creatorOnEditing
     })
    .then(()=>{
      this.props.history.push('/BillyDev_Demo/monitor');
    })
  }

  updateAppUnderEditing=(event)=>{
    const {name, value}=event.target;
    this.setState({
      [name]:value
    })
  }

  componentDidMount() {
      console.log('DTappls.js about to call the event service within componentDidMount...'); 
    eventService.getAllDTApplications().then(rows=>this.setState({rows}));
}

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
         <ModalPopup   handleModalOpen={this.handleModalOpen}  
                       handleModalClose={this.handleModalClose} 
                       modalOpen={this.state.modalOpen} 
                       submitForm={this.submitForm}
                       //dtAppUnderEditing={this.state.dtappUnderEditing}
                       updateAppUnderEditing={this.updateAppUnderEditing}
                       appnameOnEditing={this.state.appnameOnEditing} 
                       creatorOnEditing={this.state.creatorOnEditing} 
                       />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.appname}
                  </TableCell>
                  <TableCell align="right">{row.creator}</TableCell>
                  <TableCell align="right">{row.uploadtime}</TableCell>
                  <TableCell align="right"> <input
                    type='button' 
                    value='Delete'  
                    onClick={()=>{this.deleteRow(row.id)}} 
                  /></TableCell> 
                  <TableCell align="right"> <input
                    type='button' 
                    value='Edit'  
                    onClick={()=>{this.editRow(row.id)}} 
                  /></TableCell> 
                  <TableCell align="right"> <input
                    type='button' 
                    value='Trigger'  
                    onClick={()=>{this.trigger(row.id)}} 
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
      </Paper>
    );
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomPaginationActionsTable);
