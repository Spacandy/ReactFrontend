import { GraphQLObjectType as ObjectType, GraphQLString as StringType } from 'graphql';

import SignUpFormErrorsType from 'data/types/SignUpFormErrorsType';

const SignUpType = new ObjectType({
  name: 'SignUp',
  fields: {
    location: { type: StringType },
    form_errors: { type: SignUpFormErrorsType },
    html: { type: StringType }
  }
});

export default SignUpType;
