//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//

import React from 'react';
import Page from '../../../components/Page';
import PrivacyPolicy from './PrivacyPolicy.md';

function action() {
  return {
    title: PrivacyPolicy.title,
    chunks: ['privacy-policy'],
    component: <Page {...PrivacyPolicy} />,
  };
}

export default action;
