import { GraphQLString as StringType } from 'graphql';
import fetch from 'node-fetch';
import baseURL from 'data/endpoints.js';
import ResponseType from 'data/types/ResponseType';
import { processResponse } from 'data/utils.js';
import makeBasicAuthHeader from 'data/headers.js';

export const editBillingData = {
  type: ResponseType,
  args: {
    address1: { type: StringType },
    city: { type: StringType },
    state: { type: StringType },
    zipcode: { type: StringType },
    country: { type: StringType },
  },
  resolve(obj, args, context) {
    const billingDataURL = `${baseURL}/billing/data`;
    const data = {
      address1: args.address1,
      city: args.city,
      state: args.state,
      zipcode: args.zipcode,
      country: args.country,
    };

    return fetch(billingDataURL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...makeBasicAuthHeader(context.req),
      },
    }).then(response => processResponse(response));
  },
};

export default editBillingData;
