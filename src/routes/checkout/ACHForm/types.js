// @flow

type SponsorshipItem = {
  sponsorshipId: string,
  sponsorshipName: string,
  itemType: string,
  feeType: string,
  quantity: string,
  price: string,
  fees: string,
  subtotal: string,
};

type ParsedErrors = {
  streetAddress: string | null,
  addressLocality: string | null,
  addressRegion: string | null,
  addressCountry: string | null,
  postalCode: string | null,
  firstName: string | null,
  lastName: string | null,
  bankRoutingNumber: string | null,
  bankAccountNumber: string | null,
  bankAccountType: string | null,
};

type UserInfo = {
  id: string,
  email: string,
};

export type Props = {
  classes: {
    button: {},
    buttonProgress: {},
    typographyRoot: {},
  },
  selectedItems: [SponsorshipItem],
  userInfo: UserInfo,
};

export type State = {
  streetAddress: string | null,
  addressLocality: string | null,
  addressRegion: string | null,
  postalCode: string | null,
  addressCountry: string | null,
  firstName: string | null,
  lastName: string | null,
  bankRoutingNumber: string | null,
  bankAccountNumber: string | null,
  bankAccountType: string | null,
  parsedErrors: ParsedErrors,
};
