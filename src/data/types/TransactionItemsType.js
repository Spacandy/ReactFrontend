import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLList as List,
  GraphQLInt as IntType,
} from 'graphql';

import TransactionItemType from './TransactionItemType';

const TransactionItemsType = new ObjectType({
  name: 'TransactionItems',
  fields: {
    count: { type: IntType },
    next: { type: StringType },
    previous: { type: StringType },
    results: { type: new List(TransactionItemType) },
  },
});

export default TransactionItemsType;
