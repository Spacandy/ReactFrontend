import isPast from 'date-fns/is_past';
import format from 'date-fns/format';
import offsetTime from 'helpers/timezones/offsetTimezone';

export default (salesEnd, timezone = null) => {
  let date;

  if (timezone === null) {
    date = format(salesEnd, 'YYYY-MM-DDTHH:mmZZ');
  } else {
    date = offsetTime(salesEnd, timezone, 'YYYY-MM-DDTHH:mmZZ');
  }

  return isPast(date);
};
