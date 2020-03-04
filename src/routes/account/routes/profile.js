//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//

import React from 'react';
import Account from '../Account.jsx';
import AccountProfileSection from '../sections/AccountProfileSection';

function action() {
  return {
    title: 'Account- Profile',
    chunks: ['accountProfile'],
    component: (
      <Account>
        <AccountProfileSection />
      </Account>
    ),
  };
}

export default action;
