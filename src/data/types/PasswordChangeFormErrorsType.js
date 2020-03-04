import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLList as ListType
} from 'graphql';

const PasswordChangeFormErrorsType = new ObjectType({
  name: 'PasswordChangeFormErrors',
  fields: {
    oldpassword: { type: new ListType(StringType) },
    password1: { type: new ListType(StringType) },
    password2: { type: new ListType(StringType) }
  }
});

export default PasswordChangeFormErrorsType;
