import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLBoolean as BoolType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const TransactionItemType = new ObjectType({
  name: 'TransactionItem',
  fields: {
    id: { type: new NonNull(ID) },
    uid: { type: StringType },
    date: { type: StringType },
    name: { type: StringType },
    email: { type: StringType },
    guest: { type: StringType },
    claimed: { type: BoolType },
    price: { type: StringType },
  },
});

export default TransactionItemType;
