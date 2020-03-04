import {
  GraphQLInputObjectType as InputObjectType,
  GraphQLString as StringType,
} from 'graphql';

const UserInfoType = new InputObjectType({
  name: 'UserInfo',
  fields: {
    id: { type: StringType },
    email: { type: StringType },
  },
});

export default UserInfoType;
