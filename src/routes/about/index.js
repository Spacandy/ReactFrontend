//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//

import React from 'react';
import About from './About';

function action() {
  return {
    title: 'About',
    chunks: ['about'],
    component: <About />,
  };
}

export default action;
