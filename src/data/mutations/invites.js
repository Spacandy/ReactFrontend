import {
  GraphQLNonNull as NonNull,
  GraphQLList as ListType,
  GraphQLObjectType as ObjectType,
  GraphQLInt as IntType,
  GraphQLString as StringType,
} from 'graphql';
import fetch from 'node-fetch';
// Types
import { CreateInviteesTagType } from 'data/types/Invites.js';

import makeBasicAuthHeader from 'data/headers.js';
import baseURL from 'data/endpoints.js';
// export const createInviteesTag = {
//   type: CreateInviteesTagType,
//   args: {
//     template_id: { type: IntType },
//     invitee_emails: { type: new ListType(StringType) },
//     category: { type: new NonNull(StringType) },
//     org: { type: new NonNull(IntType) },
//     event: { type: new NonNull(IntType) },
//     eventId: { type: new NonNull(ID) }
//   },
//   resolve(obj, args, context) {
//     const createInviteesTagURL = `${baseURL}/invites/manage-tag?user=${context.req.user}&token=${context.req.token}`;
// ############################# Everything past this point is suspect
//     let body = `quantity=${args.quantity}`;
//
//     console.log('body: ', body);
//     return fetch(purchaseURL(args.ticketId), {
//       method: 'POST',
//       body: body,
//       headers: {
//         ...makeBasicAuthHeader(context.req),
//         'Content-Type': 'application/x-www-form-urlencoded'
//       }
//     })
//       .then(response => {
//         console.log(response.status);
//         if (response.status == 403) {
//           throw 'Authentication required';
//         }
//         if (response.status == 405) {
//           throw 'Method not allowed';
//         }
//         return response.json();
//       })
//       .then(data => {
//         return data;
//       })
//       .catch(error => {
//         console.log('Error: ', error);
//         return error;
//       });
//   }
// };
