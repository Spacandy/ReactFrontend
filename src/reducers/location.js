import {
  RECEIVE_LOCATION_SUGGESTIONS,
  RECEIVE_LOCATION_COORDINATES,
  RECEIVE_ADDRESS_FIELDS,
  UPDATE_FULL_LOCATION,
} from 'actions/location';

const initialState = {
  suggestions: [],
  lat: 0,
  lng: 0,
  fullLocation: '',
  name: '',
  streetAddress: '',
  addressLocality: '',
  addressRegion: '',
  postalCode: '',
  addressCountry: '',
};

export default function locationReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_LOCATION_SUGGESTIONS:
      return { ...state, suggestions: action.suggestions };
    case RECEIVE_LOCATION_COORDINATES:
      return { ...state, lat: action.lat, lng: action.lng };
    case RECEIVE_ADDRESS_FIELDS:
      return { ...state, ...action.values };
    case UPDATE_FULL_LOCATION:
      return { ...state, fullLocation: action.value };
    default:
      return state;
  }
}
