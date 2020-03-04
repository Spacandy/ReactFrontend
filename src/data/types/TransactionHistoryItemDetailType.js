import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLFloat as FloatType,
  GraphQLNonNull as NonNull
} from 'graphql';

const TransactionHistoryItemDetailType = new ObjectType({
  name: 'TransactionHistoryItemDetail',
  fields: {
    user: { type: StringType },
    price: { type: StringType },
    name: { type: StringType },
    address: { type: StringType },
    date: { type: StringType },
    organizer: { type: StringType },
    uid: { type: StringType }
  }
});

export default TransactionHistoryItemDetailType;
