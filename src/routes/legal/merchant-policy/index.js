//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//

import React from 'react';
import Page from '../../../components/Page';
import MerchantPolicy from './MerchantPolicy.md';

function action() {
  return {
    title: MerchantPolicy.title,
    chunks: ['terms-of-use'],
    component: <Page {...MerchantPolicy} />,
  };
}

export default action;
