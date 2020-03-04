import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull
} from 'graphql';

const OrganizerChoiceType = new ObjectType({
  name: 'OrganizerChoice',
  fields: {
    id: { type: new NonNull(ID) },
    contentTypeId: { type: IntType },
    name: { type: StringType }
  }
});

export default OrganizerChoiceType;
