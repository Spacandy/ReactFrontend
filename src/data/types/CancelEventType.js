import {
  GraphQLObjectType as ObjectType,
  GraphQLInt as IntType,
  GraphQLBoolean as BoolType,
  GraphQLNonNull as NonNull
} from 'graphql';

const CancelEventType = new ObjectType({
  name: 'CancelEvent',
  fields: {
    id: { type: IntType },
    canceled: { type: BoolType }
  }
});

export default CancelEventType;
