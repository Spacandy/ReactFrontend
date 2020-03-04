import React from 'react';
import Account from '../Account.jsx';
import AccountChangePasswordSection from '../sections/AccountChangePasswordSection';

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
    title: 'Change Password',
    chunks: ['accountPassword'],
    component: (
      <Account>
        <AccountChangePasswordSection />
      </Account>
    ),
  };
}

export default action;
