import { GraphQLString as StringType } from 'graphql';
const FormData = require('form-data'); // TODO: Can we use es6 imports here? yes
import baseURL from 'data/endpoints.js';
import makeBasicAuthHeader from 'data/headers.js';
import fetch from 'node-fetch';
import UserType from 'data/types/UserType';
import IdentifyType from 'data/types/IdentifyType';

const authURL = `${baseURL}/users/login`;
const logoutURL = `${baseURL}/users/logout`;
const identificationURL = `${baseURL}/users/me`;

export const auth = {
  type: UserType,
  args: {
    username: { type: StringType },
    password: { type: StringType },
  },
  resolve(obj, { username, password }, context) {
    const form = new FormData();
    form.append('login', username);
    form.append('password', password);
    if (context)
      return fetch(authURL, { method: 'GET' })
        .then(response => response.json())
        .then(resp => {
          return fetch(authURL, {
            method: 'POST',
            body: form,
            headers: { 'X-CSRFTsoken': resp.csrftoken },
          })
            .then(response => response.json())
            .then(data => {
              if (data.success === true) {
                // TODO: Also use secure:true for cookie options
                context.res.cookie('user', data.user, {});
                context.res.cookie('csrftoken', data.csrftoken, {});
                context.res.cookie('sessionid', data.sessionid, {});
                return fetch(identificationURL, {
                  method: 'GET',
                  headers: { 'X-SessionId': data.sessionid },
                }).then(response => response.json());
              }
              // error logging in. how do we return errors in graphql?
              throw data.errors;
            });
        });
  },
};

export const identify = {
  type: IdentifyType,
  resolve(obj, args, context) {
    if (context)
      return fetch(identificationURL, {
        method: 'GET',
        headers: makeBasicAuthHeader(context.req),
      }).then(response => {
        if (!response.ok) {
          throw { status: response.status };
        }
        return response.json();
      });
  },
};
