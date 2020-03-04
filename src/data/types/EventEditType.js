import { GraphQLObjectType as ObjectType, GraphQLID as ID } from 'graphql';

import ErrorResponseType from 'data/types/ErrorResponseType.js';

const EventEditType = new ObjectType({
  name: 'EventEdit',
  fields: {
    id: { type: ID },
    _error: { type: ErrorResponseType },
  },
});

export default EventEditType;
