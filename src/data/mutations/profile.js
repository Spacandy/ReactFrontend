import { GraphQLString as StringType } from 'graphql';

import ProfileChangeType from 'data/types/ProfileChangeType';
import fetch from 'node-fetch';
import makeBasicAuthHeader from 'data/headers.js';
import baseURL from 'data/endpoints.js';

export const profileChange = {
  type: ProfileChangeType,
  args: {
    firstName: { type: StringType },
    lastName: { type: StringType },
  },
  resolve(obj, args, context) {
    const profileChangeURL = `${baseURL}/users/profile`;
    let body = `first_name=${args.firstName}&last_name=${args.lastName}`;

    return fetch(profileChangeURL, {
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
        console.log('Error:', error);
        return error;
      });
  },
};
