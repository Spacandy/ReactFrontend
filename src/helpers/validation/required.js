import { FIELD_REQUIRED } from '../messages/errors';

export const validateRequired = value => {
  if (value === undefined || value === '') return FIELD_REQUIRED;
  return undefined;
};
