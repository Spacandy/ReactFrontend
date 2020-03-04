//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//

import React from 'react';
import Page from '../../components/Page';
import Terms from './Terms.md';

function action() {
  return {
    title: Terms.title,
    chunks: ['terms'],
    component: <Page {...Terms} />,
  };
}

export default action;
