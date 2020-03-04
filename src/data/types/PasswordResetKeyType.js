import { GraphQLObjectType as ObjectType, GraphQLString as StringType } from 'graphql';

import PasswordResetKeyFormErrorsType from 'data/types/PasswordResetKeyFormErrorsType';

const PasswordResetKeyType = new ObjectType({
  name: 'PasswordResetKey',
  fields: {
    location: { type: StringType },
    form_errors: { type: PasswordResetKeyFormErrorsType },
    html: { type: StringType }
  }
});

export default PasswordResetKeyType;
