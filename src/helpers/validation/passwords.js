import { PASSWORD_LENGTH, PASSWORD_DIGIT, PASSWORD_UPPERCASE } from '../messages/errors.js';

export function validatePassword(value) {
  const errors = [];

  if (value) {
    if (value.length > 0 && value.length < 8) {
      errors.push(PASSWORD_LENGTH);
    }

    if (/\d+/.test(value) === false) {
      errors.push(PASSWORD_DIGIT);
    }

    if (/[A-Z]/.test(value) === false) {
      errors.push(PASSWORD_UPPERCASE);
    }
  }

  return errors;
}
