import {
  GraphQLInt as IntType,
  GraphQLList as ListType,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType
} from 'graphql';

const HeaderType = new ObjectType({
  name: 'Header',
  fields: {
    key: { type: StringType },
    value: { type: StringType }
  }
});

const ErrorResponseType = new ObjectType({
  name: 'ErrorResponse',
  fields: {
    headers: { type: new ListType(HeaderType) },
    url: { type: StringType },
    status: { type: IntType },
    statusText: { type: StringType },
    body: { type: StringType }
  }
});

export default ErrorResponseType;
