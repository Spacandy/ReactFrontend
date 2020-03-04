//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//

import React from 'react';
import Page from '../../../components/Page';
import TermsOfServices from './TermsOfServices.md';

function action() {
  return {
    title: TermsOfServices.title,
    chunks: ['terms-of-services'],
    component: <Page {...TermsOfServices} />,
  };
}

export default action;
