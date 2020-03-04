import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLList as ListType,
} from 'graphql';

const SponsorshipPurchaseType = new ObjectType({
  name: 'SponsorshipPurchase',
  fields: {
    uid: { type: StringType },
    error: { type: StringType },
  },
});

export default SponsorshipPurchaseType;
