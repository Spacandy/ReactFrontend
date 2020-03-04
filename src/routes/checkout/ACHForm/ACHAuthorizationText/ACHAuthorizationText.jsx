//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

// Main
import React from 'react';

// Material-UI
import Typography from '@material-ui/core/Typography';

const ACHAuthorizationText = () => (
  <Typography
    style={{
      lineHeight: '1.66429em',
      fontSize: '0.875rem',
      marginBottom: 12,
    }}
  >
    By clicking the button below, I authorize EventHi Inc. to debit the bank account
    indicated in this web form for the noted amount upon the approval of the sponsorship
    request. I understand that because this is an electronic transaction, these funds may
    be withdrawn from my account as soon as the above noted transaction date. I understand
    that this authorization will remain in full force and effect until I notify EventHi
    Inc. by emailing contact@eventhi.io that I wish to revoke this authorization. I
    understand that EventHi Inc. requires at least 1 week prior notice in order to cancel
    this authorization. In the case of an ACH Transaction being rejected for Non
    Sufficient Funds (NSF), I understand that the business may at its discretion attempt
    to process the charge again within 30 days, and if the payment is returned unpaid, I
    authorize EventHi Inc. to make a one-time electronic fund transfer from my account to
    collect a fee of $35 which will be initiated as a separate transaction from the
    authorized payment. I acknowledge that the origination of ACH transactions to my
    account must comply with the provisions of U.S. law. I will not dispute EventHi Inc.
    debiting my checking/savings account, so long as the transaction corresponds to the
    terms indicated in this web form.
  </Typography>
);

export default ACHAuthorizationText;
