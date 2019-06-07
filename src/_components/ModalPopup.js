import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 ;//+ rand();
  const left = 50 ;//+ rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

class SimpleModal extends React.Component {
//   state = {
//     open: false,
//   };
    constructor(props){
      super(props);
      this.initialstate={
        appName:'',
        appCreateUserId:'',
        uploadTime:'',
      }
      this.state=this.initialstate;
    }

    // componentDidMount=()=>{
    //   const {dtappUnderEditing}=this.props; 
    //   this.setState({
    //       appname:dtappUnderEditing?dtappUnderEditing.appname:'',
    //       creator:dtappUnderEditing?dtappUnderEditing.creator:''
    //   })
    // }

    // handleChange=event=>{
    //   const {name, value}=event.target;
    //   this.setState({
    //     [name]:value
    //   }
    //   );
    //   // this.props.updateAppUnderEditing.updateAppUnderEditing({
    //   //   appname:this.state.appname, 
    //   //   creator:this.state.creator
    //   // });
    //   this.props.updateAppUnderEditing.updateAppUnderEditing(event.target);
    // }

    submitForm=()=>{
       this.props.submitForm();
       this.setState(this.initialstate); 
    }


  render() {
    const { classes, handleModalOpen, handleModalClose, modalOpen,updateAppUnderEditing,
       appNameOnEditing, appCreateUserIdOnEditing } = this.props;
    // this.setState({
    //     appname: dtAppUnderEditing?dtAppUnderEditing.appname:'',
    //     creator: dtAppUnderEditing?dtAppUnderEditing.creator:''
    // });
    console.log('ModelPopup.js modalOpen is:'+modalOpen);

    return (
      <div>
        <Typography gutterBottom>Click to get the full Modal experience!</Typography>
        <Button onClick={handleModalOpen}>Open Modal</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={modalOpen}
          onClose={handleModalClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <form>
              <div className="form-group">
                <label>Design Time Application</label><br />
                <input className="form-control"
                type='text' 
                name='appNameOnEditing'
                // value={this.state.appname}
                value={appNameOnEditing}
                onChange={updateAppUnderEditing}
                />
                <br  /> 
                <label>Job</label><br />
                <input className="form-control"
                type='text'
                name='appCreateUserIdOnEditing'
                // value={this.state.creator}
                value={appCreateUserIdOnEditing}
                onChange={updateAppUnderEditing}
                /><br />
                <input  className="form-control"
                type='button'
                value='Submit'
                onClick={this.submitForm}
                />
              </div>
            </form>

            {/* <SimpleModalWrapped /> */}
          </div>
        </Modal>
      </div>
    );
  }
}

// SimpleModal.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
