import isPast from 'date-fns/is_past';
import format from 'date-fns/format';
import offsetTime from 'helpers/timezones/offsetTimezone';

export default (salesStart, timezone = null) => {
  let date;

  if (timezone === null) {
    date = format(salesStart, 'YYYY-MM-DDTHH:mmZZ');
  } else {
    date = offsetTime(salesStart, timezone, 'YYYY-MM-DDTHH:mmZZ');
  }

  return isPast(date);
};
