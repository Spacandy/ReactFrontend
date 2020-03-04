import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLBoolean as BoolType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const IdentifyType = new ObjectType({
  name: 'Identify',
  fields: {
    id: { type: new NonNull(ID) },
    email: { type: StringType },
    firstName: { type: StringType },
    lastName: { type: StringType },
    isHost: { type: BoolType },
    displayName: { type: StringType },
    avatarUrl: { type: StringType },
    hasUsablePassword: { type: BoolType },
    contentTypeId: { type: IntType },
  },
});

export default IdentifyType;
