export const RECEIVE_LOCATION_SUGGESTIONS: string = 'RECEIVE_LOCATION_SUGGESTIONS';
export const RECEIVE_LOCATION_COORDINATES: string = 'RECEIVE_LOCATION_COORDINATES';
export const RECEIVE_ADDRESS_FIELDS: string = 'RECEIVE_ADDRESS_FIELDS';
export const UPDATE_FULL_LOCATION: string = 'UPDATE_FULL_LOCATION';

function receiveLocationSuggestions(suggestions) {
  return {
    type: RECEIVE_LOCATION_SUGGESTIONS,
    suggestions: suggestions,
  };
}

function receiveLocationCoordinates(lat: number, lng: number) {
  return {
    type: RECEIVE_LOCATION_COORDINATES,
    lat: lat,
    lng: lng,
  };
}

export function receiveAddressFields(values) {
  return {
    type: RECEIVE_ADDRESS_FIELDS,
    values: values,
  };
}

export function updateFullLocation(value) {
  return {
    type: UPDATE_FULL_LOCATION,
    value: value,
  };
}

export function fetchLocationSuggestions(value) {
  return function(dispatch) {
    let realValue = ''; // this is the actual string the the user typed
    // we have to rebuild it here because, redux-form's Autocomplete's onChange
    // function doesn't not just receive a simple string, but rather an object

    // so we need to extract each leter of the string from that object. the object
    // has this shape:
    // {0: 'k', 1: 'e', 2: 'n'}
    // so we get all keys, and sort them
    let keys = Object.keys(value).sort();

    // then we use the keys which are NUMBERS, and extract their values, and concat
    // them to form the original string
    keys.filter(key => !isNaN(key)).forEach(key => (realValue += value[key]));

    // this is the google autocomplete service
    let autocompleteObject = new google.maps.places.AutocompleteService();

    // we pass in the string input from the user, into the placePredictions function.
    autocompleteObject.getPlacePredictions(
      {
        input: realValue,
        types: ['address'],
        componentRestrictions: { country: 'us' },
      },
      (predictions, status) => {
        // and this is the callback that gets executed when that string input gets
        // evaluated by google. we receive a list of predictions here.
        // now we dispatch the """"REAL"""" action, which updates the redux store
        if (predictions) {
          dispatch(receiveLocationSuggestions(predictions));
        }
      },
    );
  };
}

export function fetchLocationCooridantes(choice, dataSource) {
  return function(dispatch) {
    let request = {
      placeId: dataSource.find(item => item.description == choice).place_id,
    };

    let placesService = new google.maps.places.PlacesService(
      document.createElement('div'),
    );

    return new Promise((resolve, reject) => {
      placesService.getDetails(request, (place, status) => {
        if (place) {
          let lat = place.geometry.location.lat();
          let lng = place.geometry.location.lng();
          dispatch(receiveLocationCoordinates(lat, lng));
          // dispatch address stuff

          let name = '';
          let streetAddress = place.name;
          let addressLocality = '';
          let addressRegion = '';
          let addressCountry = '';
          let postalCode = '';

          place.address_components.forEach((component, index, array) => {
            let contains = function(type) {
              return component.types.indexOf(type) >= 0;
            };
            let long_name = component.long_name;

            if (contains('premise')) {
              name = long_name;
            } else if (contains('locality')) {
              addressLocality = long_name;
            } else if (contains('administrative_area_level_1')) {
              addressRegion = long_name;
            } else if (contains('country')) {
              addressCountry = long_name;
            } else if (contains('postal_code')) {
              postalCode = long_name;
            }
          });

          dispatch(
            receiveAddressFields({
              name,
              streetAddress,
              addressLocality,
              addressRegion,
              postalCode,
              addressCountry,
            }),
          );

          resolve();
        }
      });
    });
  };
}
