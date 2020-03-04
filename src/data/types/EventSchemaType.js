import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLList as ListType,
} from 'graphql';

const EventSchemaAddressType = new ObjectType({
  name: 'EventSchemaAddress',
  fields: {
    type: { type: StringType },
    name: { type: StringType },
    streetAddress: { type: StringType },
    addressLocality: { type: StringType },
    addressRegion: { type: StringType },
    addressCountry: { type: StringType },
    postalCode: { type: StringType },
  },
});

const EventSchemaLocationType = new ObjectType({
  name: 'EventSchemaLocation',
  fields: {
    type: { type: StringType },
    name: { type: StringType },
    address: { type: EventSchemaAddressType },
  },
});

const EventSchemaOfferType = new ObjectType({
  name: 'EventSchemaOffer',
  fields: {
    type: { type: StringType },
    availability: { type: StringType },
    price: { type: StringType },
    url: { type: StringType },
    validThrough: { type: StringType },
    validFrom: { type: StringType },
    priceCurrency: { type: StringType },
  },
});

const EventSchemaType = new ObjectType({
  name: 'EventSchema',
  fields: {
    context: { type: ID },
    type: { type: StringType },
    name: { type: StringType },
    description: { type: StringType },
    location: { type: EventSchemaLocationType },
    image: { type: StringType },
    offers: { type: new ListType(EventSchemaOfferType) },
    eventStatus: { type: StringType },
    endDate: { type: StringType },
    startDate: { type: StringType },
    typicalAgeRange: { type: StringType },
  },
});

export default EventSchemaType;
