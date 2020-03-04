import baseURL from 'data/endpoints';
import makeBasicAuthHeader from 'data/headers';
import fetch from 'node-fetch';
import EventFormChoicesType from 'data/types/EventFormChoicesType';
import { processResponse } from 'data/utils';
/* eslint-disable import/prefer-default-export */
export const eventFormChoices = {
  type: EventFormChoicesType,
  resolve(obj, args, context) {
    return fetch(`${baseURL}/events/create-form-choices`, {
      method: 'GET',
      headers: {
        ...makeBasicAuthHeader(context.req),
        'Content-Type': 'application/x-www-form-urlencoded',
        'Idempotency-Key': args.idempotencyKey,
      },
    })
      .then(processResponse)
      .catch(error => console.error(error));
  },
};
/* eslint-enable import/prefer-default-export */
