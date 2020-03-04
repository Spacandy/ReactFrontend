//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//

import React from 'react';
import Pricing from './Pricing';

function action() {
  return {
    title: 'Pricing',
    chunks: ['pricing'],
    component: <Pricing />,
  };
}

export default action;
