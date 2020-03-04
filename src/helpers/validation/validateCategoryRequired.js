import { FIELD_REQUIRED } from '../messages/errors';

export const validateCategoryRequired = value =>
  value ? (value.length === 0 ? FIELD_REQUIRED : undefined) : undefined;
