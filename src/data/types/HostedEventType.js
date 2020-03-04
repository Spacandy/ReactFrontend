import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLBoolean as BoolType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const HostedEventType = new ObjectType({
  name: 'HostedEvent',
  fields: {
    id: { type: new NonNull(ID) },
    name: { type: StringType },
    canceled: { type: BoolType },
    published: { type: BoolType },
    endsAt: { type: StringType },
    name_slug: { type: StringType },
  },
});

export default HostedEventType;
