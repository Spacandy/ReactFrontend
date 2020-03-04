//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import initListeners from './listeners';
import { setAccountSidebarState } from 'actions/sidebars/accountSidebar';
import { setDashboardSidebarState } from 'actions/sidebars/dashboardSidebar';

const drawerWidthFull = 240;
const drawerWidthMin = 70;

const style = theme => ({
  root: {
    width: '100%',
    height: '100%',
    marginTop: 0,
    zIndex: 1,
    overflow: 'hidden',
    position: 'absolute',
  },
  docked: {
    height: '100%',
  },
  drawerPaper: {
    position: 'relative',
    zIndex: 9,
    width: drawerWidthFull,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperMin: {
    backgroundColor: '#fff',
    width: drawerWidthMin,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerPaperClose: {
    backgroundColor: '#fff',
    width: 0,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerUnselected: {
    backgroundColor: '#f5f5f5 !important',
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    width: drawerWidthFull,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    backgroundColor: '#fff !important',
  },
  content: {
    width: `calc(100% - (48px + ${drawerWidthFull}px))`,
    height: 'calc(100% - 50px)',
    overflowY: 'scroll',
    overflowX: 'hidden',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 24,
    left: drawerWidthFull,
    top: 0,
    position: 'absolute',
    transition: theme.transitions.create('left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentMin: {
    width: `calc(100% - (48px + ${drawerWidthMin}px))`,
    left: 60,
    transition: theme.transitions.create('left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentClose: {
    left: 0,
    width: 'calc(100% - 48px)',
    transition: theme.transitions.create('left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
});

class SidebarController extends React.Component {
  props;
  componentDidMount() {
    initListeners(
      window,
      this.props.setAccountSidebarState,
      this.props.setDashboardSidebarState,
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Drawer
          variant="permanent"
          classes={{
            docked: classes.docked,
            paper: classNames(
              classes.drawerPaper,
              this.props.sidebarOpen === 1 && classes.drawerPaperMin,
              this.props.sidebarOpen === 0 && classes.drawerPaperClose,
              this.props.eventId === 0 && classes.drawerUnselected,
            ),
          }}
          open={false}
        >
          <div className={classes.drawerInner}>
            {this.props.eventSelectField}
            <Divider />
            {this.props.list}
          </div>
        </Drawer>
        <main
          className={classNames(
            classes.content,
            this.props.sidebarOpen === 1 && classes.contentMin,
            this.props.sidebarOpen === 0 && classes.contentClose,
          )}
        >
          {this.props.children}
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sidebarOpen: state.sidebars.dashboardSidebar.state,
  eventId: state.event.dashboardEvent.eventId,
});

const mapDispatchToProps = dispatch => ({
  setAccountSidebarState: state => {
    dispatch(setAccountSidebarState(state));
  },
  setDashboardSidebarState: state => {
    dispatch(setDashboardSidebarState(state));
  },
});

export default compose(
  withStyles(style),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(SidebarController);
