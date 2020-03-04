//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

// Main
import React, { Fragment } from 'react';

// Components
import Visa from 'components/creditCardIcons/Visa';
import Mastercard from 'components/creditCardIcons/Mastercard';
import Discover from 'components/creditCardIcons/Discover';
import Amex from 'components/creditCardIcons/Amex';

const CCIcons = () => (
  <Fragment>
    <Visa style={{ margin: 5 }} />
    <Mastercard style={{ margin: 5 }} />
    <Discover style={{ margin: 5 }} />
    <Amex style={{ margin: 5 }} />
  </Fragment>
);

export default CCIcons;
