import {
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
  GraphQLInt as IntType,
  GraphQLString as StringType,
} from 'graphql';

import LogoutType from 'data/types/LogoutType.js';
import SignUpType from 'data/types/SignUpType';
import PasswordResetType from 'data/types/PasswordResetType';
import PasswordResetKeyType from 'data/types/PasswordResetKeyType';
import PasswordChangeType from 'data/types/PasswordChangeType';
import UserType from 'data/types/UserType';
import fetch from 'node-fetch';
import makeBasicAuthHeader from 'data/headers.js';
import baseURL from 'data/endpoints.js';

export const logout = {
  type: LogoutType,
  resolve(obj, args, context) {
    if (context)
      return fetch(`${baseURL}/users/logout`, {
        method: 'POST',
        headers: makeBasicAuthHeader(context.req),
      })
        .then(response => response.json())
        .then(() => {
          context.res.cookie('user', {}, { expires: new Date(0) });
          context.res.cookie('csrftoken', '-', { expires: new Date(0) });
          context.res.cookie('sessionid', '-', { expires: new Date(0) });
          return { ok: 'ok' };
        });
  },
};

export const signUp = {
  type: SignUpType,
  args: {
    email: { type: StringType },
    password1: { type: StringType },
    password2: { type: StringType },
    firstName: { type: StringType },
    lastName: { type: StringType },
  },
  // TODO: pass credentials in cookie, not as mutation argument
  // no trailing slash on the signUpUrl or 404
  resolve(obj, args, context) {
    const signUpUrl = `${baseURL}/users/signup`;
    const body = `email=${args.email}&password1=${args.password1}&password2=${
      args.password2
    }&first_name=${args.firstName}&last_name=${args.lastName}`;
    if (context)
      return fetch(signUpUrl, {
        method: 'POST',
        body,
        headers: {
          ...makeBasicAuthHeader(context.req),
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Requested-With': 'XMLHttpRequest',
        },
      })
        .then(response => {
          if (response.status < 500) {
            return response.json();
          }
          return response.text().then(text => {
            const headers = [];
            const error = {
              headers,
              url: response.url,
              status: response.status,
              statusText: response.statusText,
              body: text,
            };
            console.log({ _error: error });
          });
        })
        .catch(error => {
          console.warn('Error: ', error);
          return error;
        });
  },
};

export const passwordReset = {
  type: PasswordResetType,
  args: {
    email: { type: StringType },
  },

  resolve(obj, args, context) {
    const passwordResetURL = `${baseURL}/accounts/password/reset/`;
    let body = `email=${args.email}`;
    if (context)
      return fetch(passwordResetURL, {
        method: 'POST',
        body: body,
        headers: {
          ...makeBasicAuthHeader(context.req),
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Requested-With': 'XMLHttpRequest',
        },
      })
        .then(response => response.json())
        .catch(error => {
          console.log('Error: ', error);
          return error;
        });
  },
};

export const passwordResetKey = {
  type: PasswordResetKeyType,
  args: {
    resetKey: { type: StringType },
    password1: { type: StringType },
    password2: { type: StringType },
  },

  resolve(obj, args, context) {
    const passwordResetKeyURL = `${baseURL}/accounts/password/reset/key/${
      args.resetKey
    }/`;
    let body = `password1=${args.password1}&password2=${args.password2}`;

    if (context)
      return fetch(passwordResetKeyURL, {
        method: 'POST',
        body: body,
        headers: {
          ...makeBasicAuthHeader(context.req),
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Requested-With': 'XMLHttpRequest',
        },
      })
        .then(response => response.json())
        .catch(error => {
          console.log('Error: ', error);
          return error;
        });
  },
};

export const passwordChange = {
  type: PasswordChangeType,
  args: {
    oldpassword: { type: StringType },
    password1: { type: StringType },
    password2: { type: StringType },
  },

  resolve(obj, args, context) {
    const passwordChangeURL = `${baseURL}/users/change_password`;
    let old = args.oldpassword;
    let p1 = args.password1;
    let p2 = args.password2;
    let body = `oldpassword=${old}&password1=${p1}&password2=${p2}`;

    if (context)
      return fetch(passwordChangeURL, {
        method: 'POST',
        body: body,
        headers: {
          ...makeBasicAuthHeader(context.req),
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Requested-With': 'XMLHttpRequest',
        },
      })
        .then(response => {
          return response.json();
        })
        .catch(error => {
          console.log('Error: ', error);
          return error;
        });
  },
};

export const emailConfirm = {
  type: UserType,
  args: {
    token: { type: StringType },
  },
  resolve(obj, args, context) {
    if (context)
      return fetch(`${baseURL}/validate-email/${args.token}`)
        .then(response => response.json())
        .catch(error => {
          console.log('Error: ', error);
          return error;
        });
  },
};
