// @flow

type User = {
  firstName: string,
  lastName: string,
  displayName: string,
  email: string,
};

type Event = {
  name: string,
  organizer: string,
  startDate: string,
  location: string,
};

export type Props = {
  classes: {
    root: {},
    typographyRoot: {},
    paper: {},
    logo: {},
    total: {},
    headline: {},
    title: {},
    subheading: {},
  },
  user: User,
  client: {
    query: Function,
  },
  mutate: Function,
  eventData: Event,
};

export type State = {
  streetAddress: string,
  addressLocality: string,
  addressRegion: string,
  addressCountry: string,
  postalCode: string,
  parsedErrors: {} | null,
  focused: string | null,
  canBuy: boolean,
  cardType: string,
  numberLength: number,
  cvvLength: number,
  isValidNumber: boolean,
  fullName: string,
};
