import axios from 'axios';
import parseError from 'helpers/parsers/parseError';

export default function fetchTimezone(lat, lng, ch, form) {
  const getUnixTime = date => date / 1000 || 0;
  const timezoneQueryString = (lt, ln, ts) =>
    `https://maps.googleapis.com/maps/api/timezone/json?location=${lt},${ln}&timestamp=${ts}&key=AIzaSyBXgbKrEzECif2X33AIsrWtWAHMDyjKld0`;
  if (lat && lng) {
    axios
      .get(timezoneQueryString(lat, lng, getUnixTime(+new Date())))
      .then(({ data }) => {
        ch(form, 'timezone', data.timeZoneId);
        return ch(form, 'timeZoneName', data.timeZoneName.match(/\b\w/g).join(''));
      })
      .catch(error => parseError(error));
    return {};
  }
  console.error('no lat or lng');
  return {};
}
