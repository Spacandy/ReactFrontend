// @flow

type LocationType = {
  suggestions: {
    map: Function,
  },
  name: string,
  fullLocation: string,
  streetAddress: string,
  addressRegion: string,
  postalCode: string,
  addressCountry: string,
  addressLocality: string,
};

type InitialValuesType = {
  fullLocation: string,
};

export type Props = {
  initialValues: InitialValuesType,
  location: LocationType,
  setFullLocation: Function,
  locationChangeAction: Function,
  change: Function,
};

export type State = {};
