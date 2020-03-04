import {
  GraphQLInputObjectType as InputObjectType,
  GraphQLString as StringType,
} from 'graphql';

const BillingInfoType = new InputObjectType({
  name: 'BillingInfo',
  fields: () => ({
    firstName: { type: StringType },
    lastName: { type: StringType },
    streetAddress: { type: StringType },
    addressLocality: { type: StringType },
    addressRegion: { type: StringType },
    postalCode: { type: StringType },
  }),
});

export default BillingInfoType;
