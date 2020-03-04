import {
  GraphQLList as List,
  GraphQLInt as IntType,
  GraphQLString as StringType,
} from 'graphql';
import TransactionHistoryType from 'data/types/TransactionHistoryType';
import TransactionHistoryItemDetailType from 'data/types/TransactionHistoryItemDetailType';
import fetch from 'node-fetch';
import baseURL from 'data/endpoints.js';
import makeBasicAuthHeader from 'data/headers.js';

export const transactionHistory = {
  type: new List(TransactionHistoryType),
  resolve(obj, args, context) {
    const transactionHistoryURL = `${baseURL}/transactions/history`;
    return fetch(transactionHistoryURL, {
      method: 'GET',
      headers: makeBasicAuthHeader(context.req),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log('data: ', data);
        return data.transactions;
      })
      .catch(error => {
        console.log('Error!', error);
      });
  },
};

export const transactionHistoryDetail = {
  type: TransactionHistoryItemDetailType,
  args: {
    id: { type: IntType },
  },
  resolve(obj, { id }, context) {
    const transactionHistoryDetailURL = id => `${baseURL}/transactions/${id}`;
    return fetch(transactionHistoryDetailURL(id), {
      method: 'GET',
      headers: makeBasicAuthHeader(context.req),
    })
      .then(response => {
        return response.json();
      })
      .catch(error => {
        console.log('Error!', error);
      });
  },
};
