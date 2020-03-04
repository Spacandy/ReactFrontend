//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//

import React from 'react';
import Create from './Create';

function action({ store }) {
  // if (store) {
  //   console.log('we have a store');
  //   if (!store.getState().auth) {
  //     console.log('Trying to redirect', store.getState().auth);
  //     return { redirect: '/xxx' };
  //   } else {
  //     console.log('validated', store.getState().auth);
  //   }
  // }

  return {
    title: 'Create',
    chunks: ['create'],
    component: <Create />,
  };
}

export default action;
