import {
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
  GraphQLInt as IntType,
  GraphQLString as StringType,
} from 'graphql';
import { processResponse } from 'data/utils.js';
import fetch from 'node-fetch';
// Types
import ToggleFavoriteType from 'data/types/ToggleFavoriteType';
import CheckinType from 'data/types/CheckinType';
import EventCreateType from 'data/types/EventCreateType.js';
import EventEditType from 'data/types/EventEditType.js';
import EventPublishedType from 'data/types/EventPublishedType.js';
import CancelEventType from 'data/types/CancelEventType.js';
import ResponseType from 'data/types/ResponseType.js';
import makeBasicAuthHeader from 'data/headers.js';
import serialize from 'serialize-javascript';

import baseURL from 'data/endpoints.js';
import axios from 'axios';
import parseError from 'helpers/parsers/parseError';

export const toggleFavorite = {
  type: ToggleFavoriteType,
  args: {
    eventId: { type: new NonNull(ID) },
    user: { type: IntType },
    token: { type: StringType },
  },
  resolve(obj, { eventId, user, token }) {
    return fetch(`${baseURL}/events/${eventId}/favorite`, {
      method: 'POST',
      body: JSON.stringify({ user, token }),
    })
      .then(response => response.json())
      .catch(error => {
        console.log('Error!', error);
      })
      .finally(() => {
        // maybe do some stuff?
      });
  },
};

export const checkin = {
  // No longer uses form data
  // No longer has variable ticketUID expects String
  // Now has a args ticketsUID that expects [String]
  // Now uses axios instead of fetch: better error handling
  type: CheckinType,
  args: {
    eventId: { type: new NonNull(ID) },
    ticketsUID: { type: new NonNull(new List(StringType)) },
  },
  resolve(obj, args, context) {
    const endpoint = `${baseURL}/events/${args.eventId}/checkin`;
    const body = JSON.stringify({ uid: args.ticketsUID });
    const headers = {
      'Content-Type': 'application/json',
      ...makeBasicAuthHeader(context.req),
    };

    return axios
      .post(endpoint, body, { headers })
      .then(({ data }) => data)
      .catch(error => parseError(error));
  },
};

export const createEvent = {
  type: EventCreateType,
  args: {
    body: { type: StringType },
    idempotencyKey: { type: StringType },
  },
  resolve(obj, args, context) {
    return fetch(`${baseURL}/events/create`, {
      method: 'POST',
      body: args.body,
      headers: {
        'Content-Type': 'application/json',
        ...makeBasicAuthHeader(context.req),
        'Idempotency-Key': args.idempotencyKey,
      },
    })
      .then(processResponse)
      .catch(error => console.warn('Error!', error));
  },
};

export const editEvent = {
  type: EventEditType,
  args: {
    eventId: { type: IntType },
    body: { type: StringType },
    idempotencyKey: { type: StringType },
  },

  resolve(obj, args, context) {
    return fetch(`${baseURL}/events/${args.eventId}/edit`, {
      method: 'PATCH',
      body: args.body,
      headers: {
        'Content-Type': 'application/json',
        ...makeBasicAuthHeader(context.req),
        'Idempotency-Key': args.idempotencyKey,
      },
    })
      .then(processResponse)
      .catch(error => console.error('Error!', error));
  },
};

export const cancelEvent = {
  type: CancelEventType,
  args: {
    eventId: { type: IntType },
  },
  resolve(obj, args, context) {
    return fetch(`${baseURL}/events/${args.eventId}/cancel`, {
      method: 'POST',
      headers: makeBasicAuthHeader(context.req),
    })
      .then(response => response.json())
      .catch(error => {
        console.log('Error!', error);
      })
      .finally(() => {
        // maybe do some stuff?
      });
  },
};

export const publishEvent = {
  type: EventPublishedType,
  args: {
    eventId: { type: IntType },
  },
  resolve(obj, args, context) {
    return fetch(`${baseURL}/events/${args.eventId}/publish`, {
      method: 'POST',
      headers: makeBasicAuthHeader(context.req),
    })
      .then(response => console.log(response.json()))
      .catch(error => {
        console.log('Error!', error);
      });
  },
};

export const uploadEventPhoto = {
  type: ResponseType,
  args: {
    eventId: { type: IntType },
    imageData: { type: StringType },
  },
  resolve(obj, args, context) {
    return fetch(`${baseURL}/events/${args.eventId}/photo`, {
      method: 'POST',
      body: serialize({ image_data: args.imageData }),
      headers: {
        ...makeBasicAuthHeader(context.req),
        'Content-Type': 'application/json',
      },
    })
      .then(processResponse)
      .catch(error => {
        console.log('Error!', error);
      });
  },
};
