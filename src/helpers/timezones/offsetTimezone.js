import moment from 'moment-timezone';

export default function offsetTime(dt, timezone, format) {
  if (dt && timezone) {
    const startMoment = moment(dt);
    if (format) return startMoment.tz(timezone).format(format);
    return startMoment;
  }
}
