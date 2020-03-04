import { GraphQLSchema as Schema, GraphQLObjectType as ObjectType } from 'graphql';

// GraphQL JS docs: http://graphql.org/graphql-js/object-types/

// TODO: standardize query exports (some are named, some are default. that is [REDACTED])

// queries
import {
  eventAnalytics,
  eventDetails,
  eventDetailsSchema,
  eventFormInitialData,
  homeEvents,
  hostedEvents,
  transactionItems,
  sponsorshipsTable,
} from 'data/queries/events';
import { eventFormChoices } from 'data/queries/formChoices';
import { transactionHistory, transactionHistoryDetail } from 'data/queries/transactions';
import { auth, identify } from 'data/queries/auth';
import {
  soldTickets,
  purchasedTicketsPast,
  purchasedTicketsUpcoming,
  calculateTicketFees,
  resendOrderConfirmationEmail,
} from 'data/queries/tickets';
import { invitees } from 'data/queries/invites';
import { billingData } from 'data/queries/billing';

// mutations
import { purchaseTickets, refundTicket } from 'data/mutations/tickets.js';
import { purchaseSponsorships } from 'data/mutations/sponsorships.js';
import { purchaseDonations } from 'data/mutations/donations.js';
import { uploadPhoto } from 'data/mutations/photos.js';
import { profileChange } from 'data/mutations/profile.js';
import { editBillingData } from 'data/mutations/billing.js';

import {
  logout,
  signUp,
  passwordChange,
  passwordReset,
  passwordResetKey,
} from 'data/mutations/auth.js';

import {
  toggleFavorite,
  checkin,
  createEvent,
  cancelEvent,
  editEvent,
  publishEvent,
  uploadEventPhoto,
} from 'data/mutations/events.js';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      auth,
      billingData,
      eventAnalytics,
      eventFormChoices,
      eventDetails,
      eventDetailsSchema,
      eventFormInitialData,
      homeEvents,
      hostedEvents,
      identify,
      invitees,
      purchasedTicketsPast,
      purchasedTicketsUpcoming,
      resendOrderConfirmationEmail,
      calculateTicketFees,
      transactionHistory,
      transactionHistoryDetail,
      transactionItems,
      soldTickets,
      sponsorshipsTable,
    },
  }),

  mutation: new ObjectType({
    name: 'Mutation',
    fields: {
      cancelEvent,
      checkin,
      createEvent,
      editEvent,
      uploadEventPhoto,
      logout,
      profileChange,
      passwordChange,
      passwordReset,
      passwordResetKey,
      publishEvent,
      purchaseDonations,
      purchaseTickets,
      purchaseSponsorships,
      signUp,
      toggleFavorite,
      uploadPhoto,
      refundTicket,
      editBillingData,
    },
  }),
});

export default schema;
