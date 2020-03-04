//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React, { Component } from 'react';
import { compose } from 'react-apollo';
import { connect } from 'react-redux';
import history from 'localHistory';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from '@material-ui/core/Button';

import AnimatedCheckmark from 'components/animations/AnimatedCheckmark';

import { setPurchaseCongratsModalState } from 'actions/modals/purchaseCongratsModal';

type Props = {
  fullScreen: boolean,
  open: boolean,
  setPurchaseCongratsModalState: Function,
};

type State = {};

const styles = {};

class CongratulationsDialog extends Component<Props, State> {
  state: State;
  props: Props;

  handleNavigation = mode => {
    if (mode === 'tickets') {
      this.props.setPurchaseCongratsModalState(false);
      history.push('/orders');
    }
    if (mode === 'continue') {
      this.props.setPurchaseCongratsModalState(false);
    }
  };

  render() {
    const { fullScreen, open } = this.props;
    return (
      <Dialog fullScreen={fullScreen} open={open} onClose={this.handleContinue}>
        <DialogTitle>Transaction Sucessful</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your ticket will be in your inbox shortly!
          </DialogContentText>
          <AnimatedCheckmark />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleNavigation('tickets')} color="primary">
            Orders
          </Button>
          <Button
            onClick={() => this.handleNavigation('continue')}
            color="primary"
            autoFocus
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setPurchaseCongratsModalState: state => {
    dispatch(setPurchaseCongratsModalState(state));
  },
});

export default compose(
  withMobileDialog(),
  withStyles(styles),
  connect(
    null,
    mapDispatchToProps,
  ),
)(CongratulationsDialog);
