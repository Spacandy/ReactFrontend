import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType
  } from 'graphql';
  
  const TicketFeesType = new ObjectType({
    name: 'TicketFees',
    fields: {
      serviceFee: { type: StringType },
      creditCardFee: { type: StringType },
      baseTotal: { type: StringType },
      amountToCharge: { type: StringType },
    }
  });
  
  export default TicketFeesType;
  