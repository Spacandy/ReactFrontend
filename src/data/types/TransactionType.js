import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLBoolean as BoolType,
} from 'graphql';

const TransactionType = new ObjectType({
  name: 'Transaction',
  fields: {
    date: { type: StringType },
    user: { type: StringType },
    uid: { type: StringType },
    claimed: { type: BoolType },
  },
});

export default TransactionType;
