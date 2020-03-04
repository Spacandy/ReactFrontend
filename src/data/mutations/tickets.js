import {
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
  GraphQLInt as IntType,
  GraphQLString as StringType,
  GraphQLInputObjectType as InputObjectType,
  GraphQLList as ListType,
} from 'graphql';
import makeBasicAuthHeader from 'data/headers.js';
import baseURL from 'data/endpoints.js';
import fetch from 'node-fetch';
// Types
import PurchaseType from 'data/types/PurchaseType';
import TicketRefundType from 'data/types/TicketRefundType';

const TicketItemType = new InputObjectType({
  name: 'TicketItem',
  fields: () => ({
    ticketId: { type: StringType },
    ticketName: { type: StringType },
    itemType: { type: StringType },
    feeType: { type: StringType },
    quantity: { type: StringType },
    price: { type: StringType },
    fees: { type: StringType },
    subtotal: { type: StringType },
  }),
});

export const purchaseTickets = {
  type: PurchaseType,
  args: {
    spreedlyToken: { type: StringType },
    idempotencyKey: { type: StringType },
    selectedItems: { type: new ListType(TicketItemType) },
  },
  // TODO: pass credentials in cookie, not as mutation argument
  resolve(obj, args, context) {
    const purchaseURL = `${baseURL}/tickets/purchase`;
    const body = JSON.stringify({
      tickets: args.selectedItems,
      spreedly_token: `${args.spreedlyToken}`,
    });

    return fetch(purchaseURL, {
      method: 'POST',
      body,
      headers: {
        ...makeBasicAuthHeader(context.req),
        'Content-Type': 'application/json',
        'Idempotency-Key': args.idempotencyKey,
      },
    })
      .then(response => {
        return response.json();
      })
      .then(data => data)
      .catch(error => {
        console.error('Error: ', error);
        return error;
      });
  },
};

export const refundTicket = {
  type: TicketRefundType,
  args: {
    ticketNumber: { type: StringType },
    subject: { type: StringType },
    message: { type: StringType },
  },
  resolve(obj, args, context) {
    const returnURL = `${baseURL}/tickets/${args.ticketNumber}/refund-request`;
    const body = `subject=${args.subject}&message=${args.message}`;

    return fetch(returnURL, {
      method: 'POST',
      body,
      headers: {
        ...makeBasicAuthHeader(context.req),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(response => {
        if (response.status === 403) throw 'Authentication required';
        if (response.status === 405) throw 'Method not allowed';
        return response.json();
      })
      .catch(error => {
        console.error(error);
        return error;
      });
  },
};
