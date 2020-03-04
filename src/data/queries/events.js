import {
  GraphQLList as List,
  GraphQLInt as IntType,
  GraphQLString as StringType,
} from 'graphql';

import baseURL from 'data/endpoints';
import makeBasicAuthHeader from 'data/headers';
import { processResponse } from 'data/utils';
import fetch from 'node-fetch';
import axios from 'axios';
import parseError from 'helpers/parsers/parseError';
import EventType from 'data/types/EventType';
import EventDetailType from 'data/types/EventDetailType';
import EventSchemaType from 'data/types/EventSchemaType';
import EventAnalyticsType from 'data/types/EventAnalyticsType';
import HostedEventType from 'data/types/HostedEventType';
import TransactionItemsType from 'data/types/TransactionItemsType';
import EventFormInitialDataType from 'data/types/EventFormInitialDataType';
import SponsorshipsTableType from '../types/SponsorshipsTableType';

export const homeEvents = {
  type: new List(EventType),
  args: {
    page: { type: IntType },
  },
  resolve(obj, { page }, context) {
    return fetch(`${baseURL}/events/home?page=${page}`)
      .then(response => response.json())
      .then(data => data.events);
  },
};

export const eventDetails = {
  type: EventDetailType,
  args: {
    id: { type: StringType },
  },
  resolve(obj, { id }, context) {
    return fetch(`${baseURL}/events/${id}/`)
      .then(processResponse)
      .then(data => data.event)
      .catch(error => console.error('Error!', error));
  },
};

export const eventAnalytics = {
  type: EventAnalyticsType,
  args: {
    id: { type: IntType },
  },
  resolve(obj, { id }, context) {
    return fetch(`${baseURL}/events/${id}/analytics`, {
      method: 'GET',
      headers: makeBasicAuthHeader(context.req),
    })
      .then(processResponse)
      .catch(error => console.error('Error!', error));
  },
};

export const transactionItems = {
  type: TransactionItemsType,
  args: {
    eventId: { type: IntType },
    queryParams: { type: StringType },
  },

  resolve(obj, { eventId, queryParams }, context) {
    const queryString = (base, event, query) => `${base}/events/${event}/checkin${query}`;

    if (context) {
      const computedQueryString = queryString(baseURL, eventId, queryParams);
      const headers = {
        'Content-Type': 'application/json',
        ...makeBasicAuthHeader(context.req),
      };

      return axios
        .get(computedQueryString, { headers })
        .then(({ data }) => data)
        .catch(error => parseError(error));
    }
  },
};

export const sponsorshipsTable = {
  type: SponsorshipsTableType,
  args: {
    eventId: { type: IntType },
    queryParams: { type: StringType },
  },

  resolve(obj, { eventId, queryParams }, context) {
    const queryString = (base, event, query) =>
      `${base}/events/${event}/sponsors${query}`;

    if (context) {
      const computedQueryString = queryString(baseURL, eventId, queryParams);
      const headers = {
        'Content-Type': 'application/json',
        ...makeBasicAuthHeader(context.req),
      };

      return axios
        .get(computedQueryString, { headers })
        .then(({ data }) => data)
        .catch(error => parseError(error));
    }
  },
};

export const hostedEvents = {
  type: new List(HostedEventType),
  resolve(obj, { args }, context) {
    return fetch(`${baseURL}/events/hosted`, {
      method: 'GET',
      headers: makeBasicAuthHeader(context.req),
    })
      .then(processResponse)
      .then(data => data.events)
      .catch(error => console.error('Error!', error));
  },
};

export const eventFormInitialData = {
  type: EventFormInitialDataType,
  args: {
    id: { type: IntType },
  },
  resolve(obj, { id }, context) {
    return fetch(`${baseURL}/events/${id}/edit`, {
      method: 'GET',
      headers: makeBasicAuthHeader(context.req),
    })
      .then(processResponse)
      .then(data => data);
  },
};

export const eventDetailsSchema = {
  type: EventSchemaType,
  args: {
    id: { type: IntType },
  },
  resolve(obj, { id }, context) {
    return fetch(`${baseURL}/events/${id}/schema`)
      .then(processResponse)
      .then(data => data)
      .catch(error => console.error('Error!', error));
  },
};
