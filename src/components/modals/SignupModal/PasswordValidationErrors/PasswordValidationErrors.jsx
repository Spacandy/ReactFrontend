import React from 'react';
import theme from './PasswordValidationErrors.css';

type PropsType = {
  errors: Array<string>,
};

const PasswordValidationErrors = (props: PropsType) => (
  <div>
    <ul>
      {props.errors.map((error, index) => (
        <li className={theme.error} key={index}>{error}</li>
      ))}
    </ul>
  </div>
);

export default PasswordValidationErrors;
