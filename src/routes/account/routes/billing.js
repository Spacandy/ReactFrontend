import React from 'react';
import Account from '../Account.jsx';
import AccountBillingSection from '../sections/AccountBillingSection';

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
    title: 'Billing',
    chunks: ['accountBilling'],
    component: (
      <Account>
        <AccountBillingSection />
      </Account>
    ),
  };
}

export default action;
