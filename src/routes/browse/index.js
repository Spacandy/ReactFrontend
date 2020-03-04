//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//

import React from 'react';
import Browse from './Browse';

function action() {
  return {
    title: 'Browse',
    chunks: ['browse'],
    component: <Browse />,
  };
}

export default action;
