import { INVALID_EMAIL } from '../messages/errors';

export const validateEmailFormat = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i.test(value)
    ? INVALID_EMAIL
    : undefined;
