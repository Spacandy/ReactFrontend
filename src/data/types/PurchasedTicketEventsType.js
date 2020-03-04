import { GraphQLObjectType as ObjectType, GraphQLString as StringType } from 'graphql';

const PurchasedTicketEventsType = new ObjectType({
  name: 'PurchasedTicketEvents',
  fields: {
    eventName: { type: StringType },
    startDate: { type: StringType },
    price: { type: StringType },
    transactionId: { type: StringType },
    type: { type: StringType },
    status: { type: StringType },
    description: { type: StringType },
  },
});

export default PurchasedTicketEventsType;
