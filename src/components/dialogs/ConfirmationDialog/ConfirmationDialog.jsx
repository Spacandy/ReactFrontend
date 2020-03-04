//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React, { Component } from 'react';
import { compose } from 'react-apollo';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from '@material-ui/core/Button';

type Props = {
  title: string,
  description: string,
  handleCancel: Function,
  handleConfirm: Function,
  open: boolean,
  fullScreen: boolean,
};

type State = {};
const styles = {};
class ConfirmationDialog extends Component<Props, State> {
  state: State;
  props: Props;

  handleCancel = () => {
    if (this.props.handleCancel) this.props.handleCancel();
  };

  handleConfirm = () => {
    if (this.props.handleConfirm) this.props.handleConfirm();
  };

  handleSecondary = () => {
    if (this.props.handleSecondary) this.props.handleSecondary();
  };

  render() {
    const {
      fullScreen,
      open,
      title,
      description,
      cancelLabel,
      confirmLabel,
      secondaryButtonLabel,
    } = this.props;
    return (
      <Dialog fullScreen={fullScreen} open={open} onClose={this.handleCancel}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {!this.props.noCancel ? (
            <Button onClick={this.handleCancel} color="primary">
              {cancelLabel || 'Cancel'}
            </Button>
          ) : null}
          {this.props.secondaryButton ? (
            <Button onClick={this.handleSecondary} color="primary">
              {secondaryButtonLabel || ''}
            </Button>
          ) : null}
          <Button onClick={this.handleConfirm} color="primary" autoFocus>
            {confirmLabel || 'Yes'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
export default compose(withMobileDialog(), withStyles(styles))(ConfirmationDialog);
