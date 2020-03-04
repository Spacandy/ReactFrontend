//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//

import React from 'react';
import Page from '../../components/Page';
import Press from './Press.md';

function action() {
  return {
    title: Press.title,
    chunks: ['press'],
    component: <Page {...Press} />,
  };
}

export default action;
