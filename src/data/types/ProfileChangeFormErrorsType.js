import { GraphQLObjectType as ObjectType, GraphQLString as StringType } from 'graphql';

const ProfileChangeFormErrorsType = new ObjectType({
  name: 'ProfileChangeFormErrors',
  fields: {
    firstName: { type: StringType },
    lastName: { type: StringType },
  },
});

export default ProfileChangeFormErrorsType;
