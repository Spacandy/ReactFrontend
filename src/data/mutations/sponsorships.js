// Main
import axios from 'axios';
import { GraphQLList as ListType } from 'graphql';

// Helpers
import calculateTotalPrice from 'helpers/transaction/calculators/calculateTotalPrice';
import parseError from 'helpers/parsers/parseError';
import makeBasicAuthHeader from 'data/headers';
import { apiEndpoint, achEndpoint } from 'data/endpoints';

// Types
import SponsorshipPurchaseType from 'data/types/SponsorshipPurchaseType';
import SponsorshipItemType from 'data/types/SponsorshipItemType';
import BillingInfoType from 'data/types/BillingInfoType';
import AccountInfoType from 'data/types/AccountInfoType';
import UserInfoType from 'data/types/UserInfoType';

import { forte } from 'config';

const generateLineItems = items => {
  const resultObj = { line_item_header: 'ID,Name,Price,Qty' };

  items.forEach(item => {
    resultObj[`line_item_${Object.keys(resultObj).length}`] = `${item.sponsorshipId},${
      item.sponsorshipName
    },$${item.price},${item.quantity}`;
  });

  return resultObj;
};

const generateForteRequestBody = (items, billingInfo, accountInfo, userInfo) => ({
  action: 'authorize',
  authorization_amount: calculateTotalPrice(items),
  billing_address: {
    first_name: billingInfo.firstName,
    last_name: billingInfo.lastName,
    physical_address: {
      street_line1: billingInfo.streetAddress,
      street_line2: '',
      locality: billingInfo.addressLocality,
      region: billingInfo.addressRegion,
      postal_code: billingInfo.postalCode,
    },
  },
  echeck: {
    sec_code: 'WEB',
    account_type: accountInfo.bankAccountType,
    routing_number: accountInfo.bankRoutingNumber,
    account_number: accountInfo.bankAccountNumber,
    account_holder: `${billingInfo.firstName} ${billingInfo.lastName}`,
  },
  line_items: generateLineItems(items),
  xdata: {
    xdata_1: userInfo.id,
    xdata_2: userInfo.email,
  },
});

const generateForteRequestOptions = forteOrgID => {
  const { username, password } = forte;
  return {
    auth: {
      username,
      password,
    },
    headers: {
      'Content-Type': 'application/json',
      'X-Forte-Auth-Organization-Id': forteOrgID,
    },
  };
};

const generatePurchaseRequestBody = (selectedItems, spreedlyResponse) => ({
  sponsorships: selectedItems,
  payment_data: spreedlyResponse,
});

const generatePurchaseRequestOptions = (idempotencyKey, context) => ({
  headers: {
    ...makeBasicAuthHeader(context.req),
    'Content-Type': 'application/json',
    'Idempotency-Key': idempotencyKey,
  },
});

export const purchaseSponsorships = {
  type: SponsorshipPurchaseType,
  args: {
    items: { type: new ListType(SponsorshipItemType) },
    billingInfo: { type: BillingInfoType },
    accountInfo: { type: AccountInfoType },
    userInfo: { type: UserInfoType },
  },
  resolve(obj, { items, billingInfo, accountInfo, userInfo }, context) {
    const { orgId, locId } = forte;

    const forteEndpoint = `${achEndpoint}/organizations/${orgId}/locations/${locId}/transactions`;
    const purchaseEndpoint = `${apiEndpoint}/sponsorships/purchase`;

    const idempotencyKey = Math.floor(Math.random() * 1e17).toString();

    if (calculateTotalPrice(items) > 0) {
      return axios
        .post(
          forteEndpoint,
          generateForteRequestBody(items, billingInfo, accountInfo, userInfo),
          generateForteRequestOptions(orgId),
        )
        .then(({ data }) =>
          axios
            .post(
              purchaseEndpoint,
              generatePurchaseRequestBody(items, data),
              generatePurchaseRequestOptions(idempotencyKey, context),
            )
            .then(({ data: d }) => d)
            .catch(error => parseError(error)),
        )
        .catch(error => {
          const errMessage = error.response.data.response.response_desc || '';
          return { error: errMessage };
        });
    }

    return axios
      .post(
        purchaseEndpoint,
        generatePurchaseRequestBody(items, {}),
        generatePurchaseRequestOptions(idempotencyKey, context),
      )
      .then(({ data: d }) => d)
      .catch(error => parseError(error));
  },
};

export default { purchaseSponsorships };
