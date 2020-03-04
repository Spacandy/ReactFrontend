import { GraphQLObjectType as ObjectType, GraphQLString as StringType } from 'graphql';

import PasswordResetFormErrorsType from 'data/types/PasswordResetFormErrorsType.js';

const PasswordResetType = new ObjectType({
  name: 'PasswordReset',
  fields: {
    location: { type: StringType },
    form_errors: { type: PasswordResetFormErrorsType },
    html: { type: StringType }
  }
});

export default PasswordResetType;
