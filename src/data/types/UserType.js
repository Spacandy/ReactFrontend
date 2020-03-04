import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLBoolean as BoolType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const UserType = new ObjectType({
  name: 'User',
  fields: {
    id: { type: new NonNull(ID) },
    email: { type: StringType },
    firstName: { type: StringType },
    lastName: { type: StringType },
    displayName: { type: StringType },
    avatarUrl: { type: StringType },
    hasUsablePassword: { type: BoolType },
    contentTypeId: { type: IntType },
    csrftoken: { type: StringType },
    sessionid: { type: StringType },
  },
});

export default UserType;
