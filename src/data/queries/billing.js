import { GraphQLString as StringType } from 'graphql';
import fetch from 'node-fetch';
import baseURL from 'data/endpoints.js';
import { processResponse } from 'data/utils.js';
import makeBasicAuthHeader from 'data/headers.js';
import BillingDataType from '../types/BillingDataType';

export const billingData = {
  type: BillingDataType,
  resolve(obj, args, context) {
    const billingDataURL = `${baseURL}/billing/data`;
    return fetch(billingDataURL, {
      method: 'GET',
      headers: makeBasicAuthHeader(context.req),
    }).then(response => processResponse(response));
  },
};

export default billingData;
