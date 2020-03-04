import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLBoolean as BoolType,
  GraphQLList as ListType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import TicketType from './TicketType.js';

const EventType = new ObjectType({
  name: 'Event',
  fields: {
    id: { type: new NonNull(ID) },
    slug: { type: StringType },
    name: { type: StringType },
    canceled: { type: BoolType },
    description: { type: StringType },
    contactEmail: { type: StringType },
    categories: { type: new ListType(StringType) },
    timezone: { type: StringType },
    type: { type: StringType },
    organizer: { type: StringType },
    hostname: { type: StringType },
    isFavorite: { type: BoolType },
    location: { type: StringType },
    schedule: { type: StringType },
    private: { type: BoolType },
    image: { type: StringType },
    followers: { type: IntType },
    tickets: { type: new ListType(TicketType) },
    lowestTicketPrice: { type: StringType },
    refundPolicy: { type: IntType },
  },
});

export default EventType;
