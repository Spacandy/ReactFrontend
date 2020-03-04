import isStarted from './isStarted';
import isEnded from './isEnded';
import isSoldOut from './isSoldOut';

export default (ticket, timezone = null) =>
  isStarted(ticket.salesStart, timezone) &&
  !isSoldOut(ticket.remaining) &&
  !isEnded(ticket.salesEnd, timezone);
