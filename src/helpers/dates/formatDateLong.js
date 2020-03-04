import offsetTime from 'helpers/timezones/offsetTimezone';

export default function formatDateLong(date, timezone) {
  if (date && timezone) return offsetTime(date, timezone, 'dddd, MMM Do YYYY');
}
