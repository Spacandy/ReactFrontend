import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLList as ListType
} from 'graphql';

const PasswordResetFormErrorsType = new ObjectType({
  name: 'PasswordResetFormErrors',
  fields: {
    email: { type: new ListType(StringType) }
  }
});

export default PasswordResetFormErrorsType;
