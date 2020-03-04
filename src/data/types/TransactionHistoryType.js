import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLBoolean as BoolType,
  GraphQLList as ListType,
  GraphQLNonNull as NonNull
} from 'graphql';

const TransactionHistoryItemTicketEventType = new ObjectType({
  name: 'TransactionHistoryItemTicketEvent',
  fields: {
    name: { type: StringType },
    location: { type: StringType },
    start: { type: StringType },
    end: { type: StringType }
  }
});

const TransactionHistoryItemTicketType = new ObjectType({
  name: 'TransactionHistoryItemTicket',
  fields: {
    name: { type: StringType },
    event: { type: TransactionHistoryItemTicketEventType }
  }
});

const TransactionHistoryItemType = new ObjectType({
  name: 'TransactionHistoryItem',
  fields: {
    id: { type: new NonNull(ID) },
    uid: { type: StringType },
    total: { type: FloatType },
    refunded: { type: BoolType },
    refunded_date: { type: StringType },
    ticket: { type: TransactionHistoryItemTicketType }
  }
});

const TransactionHistoryType = new ObjectType({
  name: 'TransactionHistory',
  fields: {
    id: { type: new NonNull(ID) },
    uid: { type: StringType },
    date: { type: StringType },
    user: { type: IntType },
    total: { type: FloatType },
    items: { type: new ListType(TransactionHistoryItemType) }
  }
});

export default TransactionHistoryType;
