import {
  GraphQLInputObjectType as InputObjectType,
  GraphQLString as StringType,
} from 'graphql';

const AccountInfoType = new InputObjectType({
  name: 'AccountInfo',
  fields: () => ({
    bankAccountType: { type: StringType },
    bankRoutingNumber: { type: StringType },
    bankAccountNumber: { type: StringType },
  }),
});

export default AccountInfoType;
