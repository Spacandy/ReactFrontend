import {
  GraphQLList as List,
  GraphQLInt as IntType,
  GraphQLString as StringType,
} from 'graphql';

import PurchasedTicketEventsType from 'data/types/PurchasedTicketEventsType';
import SoldTicketType from 'data/types/SoldTicketType';
import TicketFeesType from 'data/types/TicketFeesType';
import ResponseType from 'data/types/ResponseType';
import baseURL from 'data/endpoints.js';
import makeBasicAuthHeader from 'data/headers.js';
import fetch from 'node-fetch';

export const soldTickets = {
  type: new List(SoldTicketType),
  args: {
    eventId: { type: IntType },
  },
  resolve(obj, args, context) {
    const soldTicketsURL = `${baseURL}/events/${args.eventId}/checkin`;

    return fetch(soldTicketsURL, {
      method: 'GET',
      headers: makeBasicAuthHeader(context.req),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log('data: ', data);
        return data.tickets;
      })
      .catch(error => {
        console.log('Error!', error);
      });
  },
};

export const purchasedTicketsUpcoming = {
  type: new List(PurchasedTicketEventsType),
  resolve(obj, args, context) {
    const url = `${baseURL}/tickets/purchased/upcoming`;
    if (context)
      return fetch(url, {
        method: 'GET',
        headers: makeBasicAuthHeader(context.req),
      })
        .then(response => response.json())
        .then(data => data.tickets)
        .catch(error => {
          console.log('Error: ', error);
        });
  },
};

export const purchasedTicketsPast = {
  type: new List(PurchasedTicketEventsType),
  resolve(obj, args, context) {
    const url = `${baseURL}/tickets/purchased/past`;
    return fetch(url, {
      method: 'GET',
      headers: makeBasicAuthHeader(context.req),
    })
      .then(response => response.json())
      .then(data => data.tickets)
      .catch(error => {
        console.log('Error: ', error);
      });
  },
};

export const calculateTicketFees = {
  type: TicketFeesType,
  args: {
    ticketId: { type: IntType },
    quantity: { type: IntType },
  },
  resolve(obj, args, context) {
    const url = `${baseURL}/tickets/${args.ticketId}/calculate-fees?quantity=${
      args.quantity
    }`;

    return fetch(url, {
      method: 'GET',
      headers: makeBasicAuthHeader(context.req),
    })
      .then(response => response.json())
      .catch(error => {
        console.log('Error: ', error);
      });
  },
};

export const resendOrderConfirmationEmail = {
  type: ResponseType,
  args: {
    transactionId: { type: IntType },
  },
  resolve(obj, args, context) {
    const url = `${baseURL}/tickets/resend-order-confirmation-email/${
      args.transactionId
    }`;
    return fetch(url, {
      method: 'GET',
      headers: makeBasicAuthHeader(context.req),
    })
      .then(response => response.json())
      .catch(error => {
        console.log('Error: ', error);
      });
  },
};
