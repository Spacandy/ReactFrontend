//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//

import React from 'react';
import Password from './Password';

function action({ params }) {
  return {
    title: 'EventHi- Reset Password',
    chunks: ['resetPassword'],
    component: <Password resetKey={params.key} />,
  };
}

export default action;
