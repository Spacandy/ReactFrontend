import { GraphQLObjectType as ObjectType, GraphQLString as StringType } from 'graphql';
import ErrorResponseType from './ErrorResponseType';

const ResponseType = new ObjectType({
  name: 'Response',
  fields: {
    status: { type: StringType },
    _error: { type: ErrorResponseType },
  },
});

export default ResponseType;
