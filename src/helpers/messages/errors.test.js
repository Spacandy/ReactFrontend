import {
  INVALID_EMAIL,
  FIELD_REQUIRED,
  PASSWORD_LENGTH,
  PASSWORD_DIGIT,
  PASSWORD_UPPERCASE,
} from './errors.js';

describe('Error Messages', () => {
  it('has a truty value stored in INVALID_EMAIL(depended on in AuthModal)', () => {
    expect(INVALID_EMAIL).toBeTruthy();
  });
  it('has a truty value stored in FIELD_REQUIRED(depended on in AuthModal)', () => {
    expect(FIELD_REQUIRED).toBeTruthy();
  });
  it('has a truty value stored in PASSWORD_LENGTH(depended on in AuthModal)', () => {
    expect(PASSWORD_LENGTH).toBeTruthy();
  });
  it('has a truty value stored in PASSWORD_DIGIT(depended on in AuthModal)', () => {
    expect(PASSWORD_DIGIT).toBeTruthy();
  });
  it('has a truty value stored in PASSWORD_UPPERCASE(depended on in AuthModal)', () => {
    expect(PASSWORD_UPPERCASE).toBeTruthy();
  });
});
