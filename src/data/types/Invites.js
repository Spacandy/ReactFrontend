import {
  GraphQLObjectType as ObjectType,
  GraphQLList as ListType,
  GraphQLInt as IntType,
  GraphQLString as StringType
} from 'graphql';

const OrganizationType = new ObjectType({
  name: 'Organization',
  fields: {
    id: { type: IntType },
    name: { type: StringType }
  }
});

export const InviteesType = new ObjectType({
  name: 'Invitees',
  fields: {
    organization: { type: OrganizationType },
    tag: { type: StringType },
    emails: { type: new ListType(StringType) }
  }
});

export const CreateInviteesTagType = new ObjectType({
  name: 'CreateInviteesTag',
  fields: {
    message: { type: StringType }
  }
});
