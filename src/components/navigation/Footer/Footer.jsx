// @flow
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

import Link from 'components/Link';
import Paper from '@material-ui/core/Paper';
import { footerNavLinks } from 'settings';

const pricingRoute = 'pricing';
const helpRoute = 'help';
const legalRoute = 'legal';
// const aboutRoute = 'about';
// const pressRoute = 'press';

const capitalize = str => str.toLowerCase().replace(/\b\w/g, m => m.toUpperCase());

type Props = {
  style: {},
  classes: {
    wrapper: {},
    top: {},
    contact: {},
    navlinks: {},
    menu: {},
    link: {},
    item: {},
    rights: {},
  },
};

const styles = () => ({
  link: {
    textDecoration: 'none',
  },
  wrapper: {
    position: 'relative',
    zIndex: '10',
  },
  contact: {
    height: '40px',
    textAlign: 'center',
    '& a': {
      paddingLeft: '3px',
      textDecoration: 'none',
      fontWeight: '400',
      fontSize: '14px',
      fontFamily: 'Roboto',
      color: 'black',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    '& p': {
      margin: '0',
      paddingTop: '10px',
      color: '#00aeef',
      fontWeight: '700',
      fontFamily: 'Roboto',
    },
  },
  navlinks: {
    textAlign: 'center',
  },
  menu: {
    display: 'inline-flex',
    width: 'auto',
  },
  item: {
    width: 74,
    borderRadius: '0 0 8px 8px',
    '@media (max-width: 608px)': {
      borderRadius: '8px !important',
    },
  },
  rights: {
    padding: '1px 0',
    fontWeight: '300 !important',
    fontSize: '13px !important',
    fontFamily: 'Roboto !important',
    '@media (max-width: 608px)': {
      display: 'none',
    },
  },
  top: {
    '@media (max-width: 608px)': {
      display: 'none',
    },
  },
});

const Footer = (props: Props) => (
  <div style={props.style} className={props.classes.wrapper}>
    <Paper elevation={24}>
      <div className={props.classes.top}>
        <div className={props.classes.contact}>
          <p>
            Questions? <a href="mailto:contact@eventhi.io">contact@eventhi.io</a>
          </p>
        </div>
      </div>
      <div className={props.classes.navlinks}>
        {/* <ShareSection /> */}
        {footerNavLinks ? (
          <div>
            <span className={props.classes.menu}>
              <Link className={props.classes.link} to="/help">
                <MenuItem className={props.classes.item} key={helpRoute}>
                  <div style={{ margin: '0 auto' }}>{capitalize(helpRoute)}</div>
                </MenuItem>
              </Link>
              <Link className={props.classes.link} to="/pricing">
                <MenuItem className={props.classes.item} key={pricingRoute}>
                  <div style={{ margin: '0 auto' }}>{capitalize(pricingRoute)}</div>
                </MenuItem>
              </Link>
              <Link className={props.classes.link} to="/legal">
                <MenuItem className={props.classes.item} key={legalRoute}>
                  <div style={{ margin: '0 auto' }}>{capitalize(legalRoute)}</div>
                </MenuItem>
              </Link>
            </span>
            {/* <span className={props.classes.menu}>
          <Link className={props.classes.link} to="/press">
            <MenuItem className={props.classes.item} key={pressRoute}>
              <div style={{ margin: '0 auto' }}>{capitalize(pressRoute)}</div>
            </MenuItem>
          </Link>
          <Link className={props.classes.link} to="/about">
            <MenuItem className={props.classes.item} key={aboutRoute}>
              <div style={{ margin: '0 auto' }}>{capitalize(aboutRoute)}</div>
            </MenuItem>
          </Link> */}
          </div>
        ) : null}
        <div className={props.classes.rights}>
          <p style={{ margin: '0 auto 5px' }}>© 2019 EventHi Inc. All rights reserved.</p>
        </div>
      </div>
    </Paper>
  </div>
);

export default withStyles(styles)(Footer);
