import axios from 'axios';
import parseError from 'helpers/parsers/parseError';

export default function fetchLocationGeocode(address, ch, form) {
  const geocodeQueryString = ad =>
    `https://maps.googleapis.com/maps/api/geocode/json?address=${ad}&key=AIzaSyBfNAqHFdtOWT4h341NtzkCe_327gfv6Ac`;
  if (address) {
    const endcodedAddress = encodeURI(address);
    axios
      .get(geocodeQueryString(endcodedAddress))
      .then(({ data }) => {
        if (data.results.length > 1) {
          console.error('more than one result', data.results);
        }
        if (data.results.length > 0) {
          if (data.results[0]) {
            ch(form, 'placeId', data.results[0].place_id);
            ch(form, 'lat', data.results[0].geometry.location.lat);
            ch(form, 'lng', data.results[0].geometry.location.lng);
          }
        }
      })
      .catch(error => parseError(error));
  }
}
