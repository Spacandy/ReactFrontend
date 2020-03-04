import { GraphQLObjectType as ObjectType, GraphQLList as ListType } from 'graphql';

import OrganizerChoiceType from 'data/types/OrganizerChoiceType.js';
import CategoryType from 'data/types/CategoryType.js';

const EventFormChoicesType = new ObjectType({
  name: 'EventFormChoices',
  fields: {
    organizerChoices: { type: new ListType(OrganizerChoiceType) },
    categories: { type: new ListType(CategoryType) }
  }
});

export default EventFormChoicesType;
