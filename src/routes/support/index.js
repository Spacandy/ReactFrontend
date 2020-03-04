//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//

import React from 'react';
import Support from './Support';

function action() {
  return {
    title: 'Support',
    chunks: ['support'],
    component: <Support />,
  };
}

export default action;
