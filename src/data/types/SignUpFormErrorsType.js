import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLList as ListType
} from 'graphql';

const SignUpFormErrorsType = new ObjectType({
  name: 'SignUpFormErrors',
  fields: {
    firstName: { type: new ListType(StringType) },
    lastName: { type: new ListType(StringType) },
    email: { type: new ListType(StringType) },
    password1: { type: new ListType(StringType) },
    password2: { type: new ListType(StringType) },
  }
});

export default SignUpFormErrorsType;
