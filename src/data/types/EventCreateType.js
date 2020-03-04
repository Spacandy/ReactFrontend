import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLNonNull as NonNull
} from 'graphql';

import ErrorResponseType from 'data/types/ErrorResponseType.js';


const EventCreateType = new ObjectType({
  name: 'EventCreate',
  fields: {
    id: { type: ID },
    _error: { type: ErrorResponseType }
  }
});

export default EventCreateType;
