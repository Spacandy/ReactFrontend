//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import Svg from 'components/Svg';

type StateType = {};

type PropsType = {
  classes: {},
};

const styles = () => ({
  tooltip: {
    top: '-15px !important',
  },
  circle: {
    fill: 'none',
    stroke: '#424242',
    strokeWidth: 5,
    strokeDasharray: 40,
    transition: 'all 0.5s ease-in-out',
    // animation: 'outWaveIn 1s cubic-bezier(0.42, 0, 0.58, 1) forwards',
    height: 40,
    width: 40,
    top: -2,
    position: 'absolute',
  },
  social: {
    color: '#424242',
    fontSize: '1.8em',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transition: 'all 0.5s ease-in-out',
  },
  twitter: {
    '&:hover': {
      '& $circle': {
        fill: '#fff',
        fillOpacity: 1,
        animation:
          'outWaveOut 1s cubic-bezier(0.42, 0, 0.58, 1) forwards, colorTwitter 1s linear forwards !important',
      },
      '& $twitterIcon': {
        fill: '#3aaae1 !important',
        fillOpacity: 1,
      },
    },
  },
  facebook: {
    '&:hover': {
      '& $circle': {
        fill: '#fff',
        fillOpacity: 1,
        color: '#3b5998',
        animation:
          'outWaveOut 1s cubic-bezier(0.42, 0, 0.58, 1) forwards, colorFacebook 1s linear forwards !important',
      },
      '& $facebookIcon': {
        fill: '#3b5998 !important',
        fillOpacity: 1,
      },
    },
  },
  email: {
    '&:hover': {
      '& $circle': {
        fill: '#fff',
        fillOpacity: 1,
        color: '#f47d20',
        animation:
          'outWaveOut 1s cubic-bezier(0.42, 0, 0.58, 1) forwards, colorEmail 1s linear forwards !important',
      },
      '& $emailIcon': {
        fill: '#f47d20 !important',
        fillOpacity: 1,
      },
    },
  },
  twitterIcon: {
    fill: '#424242',
    top: 6,
    left: 8,
    position: 'absolute',
  },
  facebookIcon: {
    fill: '#424242',
    top: 6,
    left: 8,
    position: 'absolute',
  },
  emailIcon: {
    fill: '#424242',
    top: 6,
    left: 8,
    position: 'absolute',
  },
  showTwitter: {
    animation: 'showTwitter .5s cubic-bezier(0.42, 0, 0.58, 1) forwards',
  },
  hideTwitter: {
    animation: 'hideTwitter .5s cubic-bezier(0.42, 0, 0.58, 1) forwards',
    pointerEvents: 'none',
    left: '-40px !important',
  },
  hiddenTwitter: {
    opacity: '0 !important',
    pointerEvents: 'none',
    left: '-40px !important',
  },
  showFacebook: {
    animation: 'showFacebook .5s cubic-bezier(0.42, 0, 0.58, 1) forwards',
  },
  hideFacebook: {
    animation: 'hideFacebook .5s cubic-bezier(0.42, 0, 0.58, 1) forwards',
    pointerEvents: 'none',
    left: '-50px !important',
  },
  hiddenFacebook: {
    opacity: '0 !important',
    pointerEvents: 'none',
    left: '-0px !important',
  },
  '@keyframes colorTwitter': {
    from: { stroke: '#ffffff' },
    to: { stroke: '#3aaae1' },
  },
  '@keyframes colorFacebook': {
    from: { stroke: '#ffffff' },
    to: { stroke: '#3b5998' },
  },
  '@keyframes colorEmail': {
    from: { stroke: '#ffffff' },
    to: { stroke: '#f47d20' },
  },
  '@keyframes showTwitter': {
    from: {
      transform: 'translateX(0)',
      opacity: 0,
    },
    to: {
      transform: 'translateX(70px)',
      opacity: 1,
    },
  },
  '@keyframes showFacebook': {
    from: {
      transform: 'translateX(0)',
      opacity: 0,
    },
    to: {
      transform: 'translateX(140px)',
      opacity: 1,
    },
  },
  '@keyframes hideTwitter': {
    from: {
      transform: 'translateX(60px)',
      opacity: 1,
    },
    to: {
      transform: 'translateX(0)',
      opacity: 0,
    },
  },
  '@keyframes hideFacebook': {
    from: {
      transform: 'translateX(110px)',
      opacity: 1,
    },
    to: {
      transform: 'translateX(0)',
      opacity: 0,
    },
  },
  '@keyframes outWaveIn': {
    from: {
      strokeWidth: 10,
      strokeDasharray: 440,
    },
  },
  '@keyframes outWaveOut': {
    from: {
      strokeWidth: 5,
      strokeDasharray: 40,
    },
    to: {
      strokeWidth: 10,
      strokeDasharray: 440,
    },
  },
});

class ShareButton extends React.Component<PropsType, StateType> {
  state: StateType = {
    open: false,
    firstLoad: true,
  };
  props: PropsType;

  handleShareButtonClick = () => {
    this.setState(prevState => ({
      open: !prevState.open,
      firstLoad: prevState.firstLoad ? !prevState.firstLoad : null,
    }));
  };

  render() {
    const { classes, slug } = this.props;
    return (
      <div>
        <Tooltip
          classes={{ popper: classes.tooltip }}
          id="tooltip-icon"
          title="Share"
          placement="bottom"
        >
          <IconButton onClick={this.handleShareButtonClick} aria-label="Delete">
            <Svg color="#424242" icon="Share" />
          </IconButton>
        </Tooltip>
        {/* https://dev.twitter.com/web/tweet-button */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=https://www.eventhi.io/event/${slug}&amp;src=sdkpreparse`}
          style={{ position: 'relative', left: 10, top: 4, opacity: 0 }}
          className={classNames(
            this.state.open && classes.showFacebook,
            !this.state.firstLoad && !this.state.open && classes.hideFacebook,
            this.state.firstLoad && classes.hiddenFacebook,
            classes.social,
            classes.facebook,
          )}
        >
          <svg
            preserveAspectRatio="xMinYMin meet"
            viewBox="0 0 200 200"
            className={classes.circle}
          >
            <circle cx="100" cy="100" r="70" />
          </svg>
          <Svg color="#424242" icon="Facebook" className={classes.facebookIcon} />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text='https://www.eventhi.io/event/${slug}'`}
          style={{ position: 'relative', top: 4, left: 60, opacity: 0 }}
          className={classNames(
            this.state.open && classes.showTwitter,
            !this.state.firstLoad && !this.state.open && classes.hideTwitter,
            this.state.firstLoad && classes.hiddenTwitter,
            classes.social,
            classes.twitter,
          )}
        >
          <svg
            preserveAspectRatio="xMinYMin meet"
            viewBox="0 0 200 200"
            className={classes.circle}
          >
            <circle cx="100" cy="100" r="70" />
          </svg>
          <Svg color="#424242" icon="Twitter" className={classes.twitterIcon} />
        </a>
        <a
          href={`mailto:?subject=You have been invited to ${
            this.props.name
          }! &body=Hey, I just wanted to share this event and thought you might like it!%0D%0A%0D%0A${
            this.props.name
          } | ${this.props.schedule} : https://www.eventhi.io/event/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ position: 'relative', top: 4, left: 110, opacity: 0 }}
          className={classNames(
            this.state.open && classes.showTwitter,
            !this.state.firstLoad && !this.state.open && classes.hideTwitter,
            this.state.firstLoad && classes.hiddenTwitter,
            classes.social,
            classes.email,
          )}
        >
          <svg
            preserveAspectRatio="xMinYMin meet"
            viewBox="0 0 200 200"
            className={classes.circle}
          >
            <circle cx="100" cy="100" r="70" />
          </svg>
          <Svg color="#424242" icon="Email" className={classes.emailIcon} />
        </a>
      </div>
    );
  }
}
export default withStyles(styles)(ShareButton);
