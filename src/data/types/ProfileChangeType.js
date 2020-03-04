import { GraphQLObjectType as ObjectType, GraphQLString as StringType } from 'graphql';

import ProfileChangeFormErrorsType from 'data/types/ProfileChangeFormErrorsType';

const ProfileChangeType = new ObjectType({
  name: 'ProfileChange',
  fields: {
    location: { type: StringType },
    form_errors: { type: ProfileChangeFormErrorsType },
    html: { type: StringType }
  }
});

export default ProfileChangeType;
