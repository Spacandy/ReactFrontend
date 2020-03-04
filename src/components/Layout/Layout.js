/**
 *              ___             _   _  _ _
 *             | __|_ _____ _ _| |_| || (_)
 * Property of:| _|\ V / -_) ' \  _| __ | |
 *             |___|\_/\___|_||_\__|_||_|_|
 *
 */

// @flow

import React, { Component, StrictMode } from 'react';
import { connect } from 'react-redux';
import { compose, withApollo } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Link from 'components/Link';
import LogoButton from 'components/buttons/LogoButton';
import CookiesNotification from 'components/CookiesNotification';
import EhiIconButton from 'components/buttons/LogoButton/IconButton';
import AccountNavigationMenu from 'components/navigation/AccountNavigationMenu';
import CongratulationsDialog from 'components/dialogs/CongratulationsDialog';
import TicketPurchaseDialog from 'components/tickets/TicketPurchaseDialog';
import Auth from 'components/navigation/Auth';
import Footer from 'components/navigation/Footer';

import AppBar from '@material-ui/core/AppBar';

import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { setAccountSidebarState } from 'actions/sidebars/accountSidebar';
import { setDashboardSidebarState } from 'actions/sidebars/dashboardSidebar';
import { identify, logout } from 'actions/auth';
import history from 'localHistory';
import identifyQuery from './identify.graphql';
import { isRelease } from 'settings';

type Props = {
  authenticated: boolean,
  logoutAction: Function,
  children: any,
  identifyAction: Function,
  create: boolean,
  menu: boolean,
  client: {
    query: Function,
  },
};

type State = {
  authModalOpen: boolean,
  signupModalOpen: boolean,
  passwordResetModalOpen: boolean,
  snackbarOpen: boolean,
  authReferrer: string,
};

const style = theme => ({
  rootDiv: {
    height: '100%',
    width: '100%',
    left: 0,
    right: 0,
  },
  container: {
    minHeight: '100vh',
  },
  loginSection: {
    position: 'absolute',
    display: '-webkit-box',
    right: 10,
    top: 14,
  },
  appBar: {
    position: 'relative',
    zIndex: theme.zIndex.navDrawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `100%`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarMin: {
    width: '100%',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none !important',
  },
  drawerHeader: {
    display: 'flex',
    position: 'absolute',
    left: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  createButtonRoot: {
    top: 0,
    position: 'absolute',
    right: 50,
  },
  createButtonRoot2: {
    top: 0,
    position: 'absolute',
    right: 150,
  },
  homeColor: {
    backgroundColor: '#fff',
  },
  otherColor: {
    backgroundColor: '#fff !important',
  },
});

class Layout extends Component<Props, State> {
  state: State = {
    authModalOpen: false,
    signupModalOpen: false,
    passwordResetModalOpen: false,
    snackbarOpen: false,
    authReferrer: '',
  };
  props: Props;

  UNSAFE_componentWillMount() {
    this.props.client
      .query({
        query: identifyQuery,
        fetchPolicy: 'network-only',
      })
      .then(response => {
        this.props.identifyAction(response.data.identify);
      })
      .catch(error => {
        this.props.logoutAction();
      });
    this.setState({
      dataLoaded: true,
    });
  }

  modalControl = (name, state) => {
    name = `${name}ModalOpen`;
    state = state === 'open';
    this.setState({ [name]: state });
  };

  closeAuthModal = () => this.setState({ authModalOpen: false });

  handleSignIn = () => this.setState({ snackbarOpen: true });
  closeSignUpModal = () => this.setState({ signupModalOpen: false });

  handleSignUp = () => this.closeSignUpModal();

  handleSnackbarClose = () => this.setState({ snackbarOpen: false });

  handleOpenAuthModal = () => this.setState({ authModalOpen: true });

  handleCreateRedirect = () => {
    history.push('/create');
    isRelease && window
      ? window.ga(
          'send',
          'event',
          'Beta',
          'Create Button Clicked',
          this.props.email || 'No Login',
        )
      : null;
  };

  openSignupModal = () => this.setState({ signupModalOpen: true });

  openLoginModalwithCreate = () =>
    this.setState({
      authModalOpen: true,
      authReferrer: 'create',
    });

  handleDrawerAction = () => {
    if (typeof window === 'object') {
      if (window.innerWidth < 767) {
        if (this.props.sidebarOpen === 2) {
          this.props.setAccountSidebarState(0, 'right');
          this.props.setDashboardSidebarState(0, 'right');
        } else {
          this.props.setAccountSidebarState(2, 'left');
          this.props.setDashboardSidebarState(2, 'left');
        }
      } else {
        if (this.props.sidebarOpen === 2) {
          this.props.setAccountSidebarState(1, 'right');
          this.props.setDashboardSidebarState(1, 'right');
        } else {
          this.props.setAccountSidebarState(2, 'left');
          this.props.setDashboardSidebarState(2, 'left');
        }
      }
    }
  };

  handleCongratulationsClose = () => {
    this.props.dispatch(setPurchaseCongratsModalState(false));
    this.props.dispatch(setPurchaseTicketModalState(false, null, null, null));
  };

  render() {
    const { classes, theme } = this.props;

    const childrenWithProps = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        openSignupModal: this.openSignupModal,
        openLoginModalwithCreate: this.openLoginModalwithCreate,
        handleCreateRedirect: this.handleCreateRedirect,
      }),
    );

    return (
      <div className={classes.rootDiv}>
        <StrictMode>
          <AppBar
            className={classNames(
              classes.appBar,
              this.props.menu && this.props.sidebarOpen === 1 && classes.appBarMin,
              this.props.menu && this.props.sidebarOpen === 2 && classes.appBarShift,
            )}
            style={{
              display: this.props.headerHidden ? 'none' : null,
            }}
          >
            {this.props.menu ? (
              <div className={classes.drawerHeader}>
                <IconButton onClick={this.handleDrawerAction}>
                  {this.sidebarDirection === 'right' ? (
                    <ChevronRightIcon />
                  ) : (
                    <ChevronLeftIcon />
                  )}
                </IconButton>
                <Link style={{ height: 64 }} to="/">
                  <EhiIconButton />
                </Link>
              </div>
            ) : (
              <Link style={{ height: 64, maxWidth: 130 }} to="/">
                <LogoButton />
              </Link>
            )}
            <div className={classes.loginSection}>
              {this.props.authenticated
                ? [
                    this.props.create ? (
                      <Button
                        classes={{ root: classes.createButtonRoot }}
                        onClick={this.handleCreateRedirect}
                        color="primary"
                        key="0"
                      >
                        Create
                      </Button>
                    ) : null,
                    <AccountNavigationMenu key="1" />,
                  ]
                : [
                    <Button
                      classes={{ root: classes.createButtonRoot2 }}
                      onClick={this.openLoginModalwithCreate}
                      color="primary"
                      key="0"
                    >
                      Create
                    </Button>,
                    <Button color="primary" key="0" onClick={this.openSignupModal}>
                      Signup
                    </Button>,
                    <Button key="1" onClick={this.handleOpenAuthModal}>
                      Login
                    </Button>,
                  ]}
            </div>
          </AppBar>
          <Auth
            modalControl={this.modalControl}
            snackbarOpen={this.state.snackbarOpen}
            handleSnackbarClose={this.handleSnackbarClose}
            closeAuthModal={this.closeAuthModal}
            authModalOpen={this.state.authModalOpen}
            handleSignIn={this.handleSignIn}
            closeSignUpModal={this.closeSignUpModal}
            signupModalOpen={this.state.signupModalOpen}
            referrer={this.state.authReferrer}
            handleCreateRedirect={this.handleCreateRedirect}
            handleSignUp={this.handleSignUp}
            passwordResetModalOpen={this.state.passwordResetModalOpen}
          />
          <div className={classes.container}>
            {childrenWithProps}
            <TicketPurchaseDialog openSignupModal={this.openSignupModal} />
            <CongratulationsDialog
              open={this.props.congratulationsDialogOpen}
              onClose={this.handleCongratulationsClose}
            />
            <CookiesNotification />
          </div>
          <Footer
            style={{
              display: this.props.footerHidden ? 'none' : null,
            }}
          />
        </StrictMode>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  user: state.auth.id,
  email: state.auth.email,
  sidebarOpen: state.sidebars.dashboardSidebar.state,
  sidebarDirection: state.sidebars.dashboardSidebar.direction,
  congratulationsDialogOpen: state.modals.purchaseCongratsModal.open,
});

const mapDispatchToProps = dispatch => ({
  identifyAction: info => {
    dispatch(identify(info));
  },
  logoutAction: () => {
    dispatch(logout());
  },
  setAccountSidebarState: (state, direction) => {
    dispatch(setAccountSidebarState(state, direction));
  },
  setDashboardSidebarState: (state, direction) => {
    dispatch(setDashboardSidebarState(state, direction));
  },
});

export default compose(
  withStyles(style),
  withApollo,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Layout);
