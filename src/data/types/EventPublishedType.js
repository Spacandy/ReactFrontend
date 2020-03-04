import {
  GraphQLObjectType as ObjectType,
  GraphQLInt as IntType,
  GraphQLBoolean as BoolType
} from 'graphql';

const EventPublishedType = new ObjectType({
  name: 'EventPublished',
  fields: {
    id: { type: IntType },
    published: { type: BoolType }
  }
});

export default EventPublishedType;
