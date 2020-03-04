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

const TicketType = new ObjectType({
  name: 'Ticket',
  fields: {
    id: { type: ID },
    ticketName: { type: StringType },
    description: { type: StringType },
    quantity: { type: IntType },
    showQuantity: { type: BoolType },
    active: { type: BoolType },
    remaining: { type: IntType },
    salesStart: { type: StringType },
    salesEnd: { type: StringType },
    minPerOrder: { type: IntType },
    maxPerOrder: { type: IntType },
    itemType: { type: StringType },
    price: { type: FloatType },
    feesType: { type: StringType },
    serviceFee: { type: FloatType },
    creditCardFee: { type: FloatType },
  },
});

export default TicketType;
