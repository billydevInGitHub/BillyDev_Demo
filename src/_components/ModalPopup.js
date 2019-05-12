import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

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
        appname:'',
        creator:'',
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
       appnameOnEditing, creatorOnEditing } = this.props;
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
            <Typography variant="h6" id="modal-title">
              Text in a modal
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
            <form>
            <label>DTapp Name</label>
                <input
                type='text' 
                name='appnameOnEditing'
                // value={this.state.appname}
                value={appnameOnEditing}
                onChange={updateAppUnderEditing}
                /> 
                <label>Job</label>
                <input 
                type='text'
                name='creatorOnEditing'
                // value={this.state.creator}
                value={creatorOnEditing}
                onChange={updateAppUnderEditing}
                />
                <input
                type='button'
                value='Submit'
                onClick={this.submitForm}
                />
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
