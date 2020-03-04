import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLBoolean as BoolType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const SponsorshipType = new ObjectType({
  name: 'SponsorshipType',
  fields: {
    id: { type: new NonNull(ID) },
    uid: { type: StringType },
    date: { type: StringType },
    ticketName: { type: StringType },
    description: { type: StringType },
    price: { type: FloatType },
    quantity: { type: IntType },
    quantity_remaining: { type: IntType },
  },
});

export default SponsorshipType;
