import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLBoolean as BoolType,
  GraphQLList as ListType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
} from 'graphql';

import ErrorResponseType from 'data/types/ErrorResponseType.js';

const TicketInitialDataType = new ObjectType({
  name: 'TicketInitialData',
  fields: {
    id: { type: IntType },
    event: { type: IntType },
    ticketName: { type: StringType },
    description: { type: StringType },
    type: { type: StringType },
    feesType: { type: StringType },
    quantity: { type: IntType },
    price: { type: FloatType },
    availability: { type: StringType },
    allowWaitlist: { type: BoolType },
    hideType: { type: BoolType },
    minPerOrder: { type: IntType },
    maxPerOrder: { type: IntType },
    salesStartDate: { type: StringType },
    salesStartTime: { type: StringType },
    salesEndDate: { type: StringType },
    salesEndTime: { type: StringType },
    showQuantity: { type: BoolType },
    hasSoldTickets: { type: BoolType },
  },
});

const GeneralInitialDataType = new ObjectType({
  name: 'GeneralInitialData',
  fields: {
    eventTitle: { type: StringType },
    hostname: { type: StringType },
    description: { type: StringType },
    contactEmail: { type: StringType },
    objectId: { type: IntType },
    contentType: { type: IntType },
    cannabisConsumption: { type: BoolType },
    isPublic: { type: BoolType },
    allowSharing: { type: BoolType },
    timezone: { type: StringType },
    timezoneOffset: { type: StringType },
    hasSoldTickets: { type: BoolType },
  },
});

const WhenInitialDataType = new ObjectType({
  name: 'WhenInitialData',
  fields: {
    startDate: { type: StringType },
    startTime: { type: StringType },
    endDate: { type: StringType },
    endTime: { type: StringType },
    timezone: { type: StringType },
  },
});

const WhereInitialDataType = new ObjectType({
  name: 'WhereInitialData',
  fields: {
    locationType: { type: StringType },
    // fields for physical location
    fullLocation: { type: StringType },
    addressName: { type: StringType },
    streetAddress: { type: StringType },
    addressLocality: { type: StringType },
    addressRegion: { type: StringType },
    addressCountry: { type: StringType },
    postalCode: { type: StringType },
    showOnSite: { type: BoolType },
    showOnTicket: { type: BoolType },
    privateLocation: { type: BoolType },
    // field for online location
    eventUrl: { type: StringType },
  },
});

const MediaInitialDataType = new ObjectType({
  name: 'MediaInitialData',
  fields: {
    logoFilename: { type: StringType },
    logoURL: { type: StringType },
    videoURL: { type: StringType },
  },
});

const PromoteInitialDataType = new ObjectType({
  name: 'PromoteInitialData',
  fields: {
    categories: { type: new ListType(StringType) },
    organizerWebsite: { type: StringType },
    organizerFacebook: { type: StringType },
    organizerInstagram: { type: StringType },
    organizerTwitter: { type: StringType },
  },
});

const RefundsInitialDataType = new ObjectType({
  name: 'RefundsInitialData',
  fields: {
    refundPolicy: { type: IntType },
  },
});

const EventFormInitialDataType = new ObjectType({
  name: 'EventFormInitialData',
  fields: {
    id: { type: IntType },
    general: { type: GeneralInitialDataType },
    when: { type: WhenInitialDataType },
    where: { type: WhereInitialDataType },
    tickets: { type: new ListType(TicketInitialDataType) },
    media: { type: MediaInitialDataType },
    promote: { type: PromoteInitialDataType },
    refunds: { type: RefundsInitialDataType },

    _error: { type: ErrorResponseType },
  },
});

export default EventFormInitialDataType;
