import { GraphQLObjectType as ObjectType, GraphQLString as StringType } from 'graphql';

const LogoutType = new ObjectType({
  name: 'Logout',
  fields: {
    ok: { type: StringType }
  }
});

export default LogoutType;
