import { GraphQLObjectType as ObjectType, GraphQLString as StringType } from 'graphql';

import PasswordChangeFormErrorsType from 'data/types/PasswordChangeFormErrorsType';

const PasswordChangeType = new ObjectType({
  name: 'PasswordChange',
  fields: {
    location: { type: StringType },
    form_errors: { type: PasswordChangeFormErrorsType },
    html: { type: StringType }
  }
});

export default PasswordChangeType;
