//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//

import React from 'react';
import Page from '../../../components/Page';
import TermsOfUse from './TermsOfUse.md';

function action() {
  return {
    title: TermsOfUse.title,
    chunks: ['terms-of-use'],
    component: <Page {...TermsOfUse} />,
  };
}

export default action;
