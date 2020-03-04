import {
  GraphQLObjectType as ObjectType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLScalarType as ScalarType,
} from 'graphql';

const EventAnalyticsType = new ObjectType({
  name: 'EventAnalytics',
  fields: {
    secondsLeft: { type: IntType },
    amountSold: { type: FloatType },
    ticketsSold: { type: IntType },
    ticketsClaimed: { type: IntType },
    ticketsRemaining: {
      type: new ScalarType({
        name: 'TicketsRemaining',
        serialize: value => value,
        parseValue: value => value,
        parseLiteral: ast => {
          if (ast.kind !== Kind.OBJECT) {
            throw new GraphQLError(
              'Query error: Can only parse object but got a: ' + ast.kind,
              [ast],
            );
          }
          return ast.value;
        },
      }),
    },
    sponsorshipsAmountSold: { type: FloatType },
    sponsorshipsSold: { type: IntType },
    sponsorshipsRemaining: {
      type: new ScalarType({
        name: 'SponsorshipsRemaining',
        serialize: value => value,
        parseValue: value => value,
        parseLiteral: ast => {
          if (ast.kind !== Kind.OBJECT) {
            throw new GraphQLError(
              'Query error: Can only parse object but got a: ' + ast.kind,
              [ast],
            );
          }
          return ast.value;
        },
      }),
    },
  },
});

export default EventAnalyticsType;
