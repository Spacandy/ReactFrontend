//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//

import React from 'react';
import EmailValidation from '../EmailValidation';
import EmailValidationSection from '../sections/EmailValidationSection';

function action({ params }) {
  return {
    title: 'Email Validation',
    chunks: ['emailValidation'],
    component: (
      <EmailValidation>
        <EmailValidationSection validationKey={params.validationKey} />
      </EmailValidation>
    ),
  };
}

export default action;
