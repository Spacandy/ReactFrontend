import {
  GraphQLInputObjectType as InputObjectType,
  GraphQLString as StringType,
} from 'graphql';

const SponsorshipItemType = new InputObjectType({
  name: 'SponsorshipItem',
  fields: () => ({
    sponsorshipId: { type: StringType },
    sponsorshipName: { type: StringType },
    itemType: { type: StringType },
    feeType: { type: StringType },
    quantity: { type: StringType },
    price: { type: StringType },
    fees: { type: StringType },
    subtotal: { type: StringType },
  }),
});

export default SponsorshipItemType;
