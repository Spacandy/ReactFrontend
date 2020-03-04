import { GraphQLInt as IntType, GraphQLString as StringType } from 'graphql';
import { InviteesType } from 'data/types/Invites';
import baseURL from 'data/endpoints';
import makeBasicAuthHeader from 'data/headers';
import { processResponse } from 'data/utils';
import fetch from 'node-fetch';
/* eslint-disable import/prefer-default-export */
export const invitees = {
  type: InviteesType,
  args: {
    org_id: { type: IntType },
    tag: { type: StringType },
  },
  resolve(obj, args, context) {
    const manageTagURL = `${baseURL}/invites/manage-tag?org_id=${args.org_id}&tag=${
      args.tag
    }`;
    return fetch(manageTagURL, {
      method: 'GET',
      headers: makeBasicAuthHeader(context.req),
    })
      .then(processResponse)
      .catch(error => console.error('Error!', error));
  },
};
/* eslint-enable import/prefer-default-export */
