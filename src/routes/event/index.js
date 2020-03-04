//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//

import React from 'react';
import Event from './Event';
import NotFound from '../not-found/NotFound';
import { processResponse } from 'data/utils';
import baseURL from 'data/endpoints';

const graphqlUrl = '/graphql';
const notFoundTitle = 'Page Not Found';

const renameKeys = (obj, newKeys) => {
  const keyValues = Object.keys(obj).map(key => {
    const newKey = newKeys[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
};
const processID = id => {
  const splitID = id.split('-');
  return `${splitID.pop()}`;
};

const processSchema = schema => {
  if (schema) {
    const { location, offers, ...rest } = schema;
    const { address, ...restLocation } = location;

    const newKeys = { type: '@type', context: '@context', offerstype: '@type' };
    const newNestedKeys = { type: '@type' };

    const renamedRest = renameKeys(rest, newKeys);
    const renamedAddress = renameKeys(address, newNestedKeys);
    const renamedRestLocation = renameKeys(restLocation, newNestedKeys);
    const renamedOffers = offers.map(offer => renameKeys(offer, newNestedKeys));

    return {
      ...renamedRest,
      location: {
        address: { ...renamedAddress },
        ...renamedRestLocation,
      },
      offers: [...renamedOffers],
    };
  }
};

async function action({ fetch, params }) {
  const response = await fetch(graphqlUrl, {
    body: JSON.stringify({
      query: `{
        eventDetails(id: "${params.id}") {
          id
          name
          slug
          slugHistory
          hostname
          description
          categories
          timezone
          location
          startDate
          endDate
          image
          type
          organizer
          published
          private
          canceled
          isFavorite
          video_url
          allowShare
          facebookUrl
          twitterUrl
          instagramUrl
          websiteUrl
          hideLocation
          locationData {
            streetAddress
            addressLocality
            type
            addressName
            addressRegion
            addressCountry
            postalCode
          }
          cannabisConsumption
          contactEmail
          refundPolicy
          lowestTicketPrice
          relatedEvents {
            id
            slug
            name
            canceled
            description
            contactEmail
            categories
            timezone
            type
            organizer
            hostname
            isFavorite
            location
            schedule
            private
            image
            followers
            tickets {
              id
              ticketName
              description
              active
              quantity
              showQuantity
              remaining
              itemType
              salesStart
              salesEnd
              minPerOrder
              maxPerOrder
              price
              feesType
              serviceFee
              creditCardFee
            }
            lowestTicketPrice
            refundPolicy
          }
          tickets {
            id
            ticketName
            description
            active
            quantity
            showQuantity
            remaining
            itemType
            salesStart
            salesEnd
            minPerOrder
            maxPerOrder
            price
            feesType
            serviceFee
            creditCardFee
          }
        }
        eventDetailsSchema(id: 2) {
          context
          type
          name
          description
          location {
            type
            name
            address {
              type
              name
              streetAddress
              addressLocality
              addressRegion
              addressCountry
              postalCode
            }
          }
          image
          offers {
            type
            availability
            price
            url
            validThrough
            validFrom
            priceCurrency
          }
          eventStatus
          endDate
          startDate
          typicalAgeRange
        }
      }`,
    }),
  });

  const { data } = await response.json();
  const { eventDetails, eventDetailsSchema } = data;

  if (!eventDetails || !eventDetails.published) {
    return {
      chunks: ['not-found'],
      title: notFoundTitle,
      component: <NotFound title={notFoundTitle} />,
      status: 404,
    };
  }

  if (eventDetails && eventDetails.id === params.id)
    return { redirect: `/event/${eventDetails.slug}` };
  if (eventDetails && eventDetails.slugHistory.includes(params.id))
    return { redirect: `/event/${eventDetails.slug}` };

  return {
    title: eventDetails.name || '',
    chunks: ['event'],
    component: <Event event={eventDetails} schema={processSchema(eventDetailsSchema)} />,
  };
}

export default action;
