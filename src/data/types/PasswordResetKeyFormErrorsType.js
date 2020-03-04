import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLList as ListType
} from 'graphql';

const PasswordResetKeyFormErrorsType = new ObjectType({
  name: 'PasswordResetKeyFormErrors',
  fields: {
    password1: { type: new ListType(StringType) },
    password2: { type: new ListType(StringType) }
  }
});

export default PasswordResetKeyFormErrorsType;
