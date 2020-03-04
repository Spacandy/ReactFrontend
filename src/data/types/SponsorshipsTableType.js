import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLList as List,
} from 'graphql';

import SponsorshipTransactionItemType from './SponsorshipTransactionItemType';

const SponsorshipTableType = new ObjectType({
  name: 'SponsorshipTable',
  fields: {
    count: { type: IntType },
    next: { type: StringType },
    previous: { type: StringType },
    results: { type: new List(SponsorshipTransactionItemType) },
  },
});

export default SponsorshipTableType;
