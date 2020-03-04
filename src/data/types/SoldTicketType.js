import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLBoolean as BoolType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull
} from 'graphql';

const SoldTicketType = new ObjectType({
  name: 'SoldTicket',
  fields: {
    id: { type: new NonNull(ID) },
    uid: { type: StringType },
    name: { type: StringType },
    guest: { type: StringType },
    claimed: { type: BoolType }
  }
});

export default SoldTicketType;
