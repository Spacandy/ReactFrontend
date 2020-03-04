//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//

import React from 'react';
import Tickets from './Tickets';

function action({ store }) {
  // if (store) {
  //   console.log('we have a store');
  //   if (!store.getState().auth) {
  //     console.log('Trying to redirect');
  //     return { redirect: '/' };
  //   } else {
  //     console.log('no store');
  //   }
  // }
  return {
    title: 'Orders',
    chunks: ['tickets'],
    component: <Tickets />,
  };
}

export default action;
