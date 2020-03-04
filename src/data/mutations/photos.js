import { GraphQLString as StringType } from 'graphql';
import fetch from 'node-fetch';
import PhotoUploadType from 'data/types/PhotoUploadType';

import makeBasicAuthHeader from 'data/headers.js';
import baseURL from 'data/endpoints.js';

export const uploadPhoto = {
  type: PhotoUploadType,
  args: {
    filename: { type: StringType },
    photo: { type: StringType },
  },
  resolve(obj, args, context) {
    let uploadURL = `${baseURL}/photos/`;
    let options = {
      method: 'POST',
      body: `{"filename": "${args.filename}", "file": "${args.photo}"}`,
      headers: {
        ...makeBasicAuthHeader(context.req),
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return fetch(uploadURL, options)
      .then(response => response.json())
      .catch(error => {
        console.log('Error!', error);
      });
  },
};
