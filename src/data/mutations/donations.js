import {
  GraphQLID as ID,
  GraphQLInt as IntType,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
} from 'graphql';
// import fetch from 'node-fetch';
import PurchaseType from 'data/types/PurchaseType';
import makeBasicAuthHeader from 'data/headers.js';
import baseURL from 'data/endpoints.js';
// import fetch from 'node-fetch';
export const purchaseDonations = {
  type: PurchaseType,
  args: {
    donations: { type: new List(IntType) },
    amounts: { type: new List(IntType) },
    quantities: { type: new List(IntType) },
  },
  // TODO: pass credentials in cookie, not as mutation argument
  resolve(obj, args, context) {
    const purchaseURL = () => `${baseURL}/donations/purchase`;

    let queryStringParts = [];
    args.donations.forEach(id => queryStringParts.push(`donations=${id}`));
    args.amounts.forEach(id => queryStringParts.push(`amounts=${id}`));
    args.quantities.forEach(id => queryStringParts.push(`quantities=${id}`));
    let queryString = queryStringParts.join('&');
    //   fetch(purchaseURL(args.ticketId), {
    //     method: 'POST',
    //     body: queryString,
    //     headers: {
    //       ...makeBasicAuthHeader(context.req),
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //   })
    //     .then(response => {
    //       console.log(response.status);
    //       if (response.status == 403) {
    //         throw 'Authentication required';
    //       }
    //       return response.json();
    //     })
    //     .then(data => {
    //       return data;
    //     })
    //     .catch(error => {
    //       console.log('Error: ', error);
    //       return error;
    //     });
    // },
  },
};
