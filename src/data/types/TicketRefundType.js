import { GraphQLObjectType as ObjectType, GraphQLBoolean as BoolType } from 'graphql';

const TicketRefundType = new ObjectType({
  name: 'TicketReturn',
  fields: {
    returned: { type: BoolType },
  },
});

export default TicketRefundType;
