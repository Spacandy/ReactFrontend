//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//

import React from 'react';

import isEmpty from 'helpers/isEmpty';

import Checkout from './Checkout';

function action({ query, store }) {
  if (store) {
    if (store.getState().checkout) {
      const { eventData, selectedItems } = store.getState().checkout;
      if (isEmpty(eventData) || isEmpty(selectedItems)) return { redirect: '/' };
    }
  }

  return {
    title: 'Checkout',
    chunks: ['checkout'],
    component: <Checkout query={query} />,
  };
}

export default action;
