import offsetTime from 'helpers/timezones/offsetTimezone';

export default function formatTime(time, timezone) {
  const formattedTime = offsetTime(time, timezone, 'hh:mm A');

  return formattedTime;
}
