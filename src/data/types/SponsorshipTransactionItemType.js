import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLBoolean as BoolType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import SponsorshipType from './SponsorshipType';

const SponsorshiptTransactionItemType = new ObjectType({
  name: 'SponsorshipTransactionItemType',
  fields: {
    id: { type: StringType },
    uid: { type: StringType },
    total: { type: FloatType },
    status: { type: StringType },
    date: { type: StringType },
    sponsorship: { type: SponsorshipType },
    user: { type: StringType },
    email: { type: StringType },
  },
});

export default SponsorshiptTransactionItemType;
