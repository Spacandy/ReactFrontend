import {
  GraphQLInputObjectType as InputObjectType,
  GraphQLBoolean as BoolType,
  GraphQLInt as IntType,
  GraphQLString as StringType,
} from 'graphql';

const TicketInstanceType = new InputObjectType({
  name: 'TicketInstance',
  fields: {
    ticketName: { type: StringType },
    quantity: { type: IntType },
    price: { type: StringType },
    description: { type: StringType },
    feesType: { type: StringType },
    salesStart: { type: StringType },
    salesEnd: { type: StringType },
    maxPerOrder: { type: IntType },
    showQuantity: { type: BoolType },
  },
});

export default TicketInstanceType;
