import { GraphQLObjectType as ObjectType, GraphQLString as StringType } from 'graphql';

const BillingDataType = new ObjectType({
  name: 'BillingData',
  fields: {
    address1: { type: StringType },
    city: { type: StringType },
    state: { type: StringType },
    zipcode: { type: StringType },
    country: { type: StringType },
  }
});

export default BillingDataType;
