import isArray from 'helpers/isArray';
import isObject from 'helpers/isObject';
import isEmpty from 'helpers/isEmpty';

export default function redirectToError(errors, setEventFormStep, setEventFormTicket) {
  const { general, where, when, tickets, promote, refunds } = errors;
  if (general) {
    if (general.title && general.title.length > 0) {
      return setEventFormStep(0);
    }
    if (general.hostname && general.hostname.length > 0) {
      return setEventFormStep(0);
    }
    if (general.contactEmail && general.contactEmail.length > 0) {
      return setEventFormStep(0);
    }
  }
  if (where) {
    if (where.location_type && where.location_type.length > 0) {
      return setEventFormStep(1);
    }

    if (
      where.online_location &&
      where.online_location.url &&
      where.online_location.url.length > 0
    ) {
      return setEventFormStep(1);
    }
    if (
      where.physical_location &&
      where.physical_location.address_locality &&
      where.physical_location.address_locality.length > 0
    ) {
      return setEventFormStep(1);
    }
    if (
      where.physical_location &&
      where.physical_location.address_region &&
      where.physical_location.address_region.length > 0
    ) {
      return setEventFormStep(1);
    }
    if (
      where.physical_location &&
      where.physical_location.postal_code &&
      where.physical_location.postal_code.length > 0
    ) {
      return setEventFormStep(1);
    }

    if (
      where.physical_location &&
      where.physical_location.street_address &&
      where.physical_location.street_address.length > 0
    ) {
      return setEventFormStep(1);
    }
  }
  if (when) {
    if (when.startDate && when.startDate.length > 0) {
      return setEventFormStep(2);
    }
    if (when.endDate && when.endDate.length > 0) {
      return setEventFormStep(2);
    }
    if (when.startTime && when.startTime.length > 0) {
      return setEventFormStep(2);
    }
    if (when.endTime && when.endTime.length > 0) {
      return setEventFormStep(2);
    }
  }

  if (tickets) {
    if (isArray(tickets)) {
      if (isEmpty(tickets)) {
        return setEventFormStep(4);
      }
      if (tickets.length === 1) {
        if (typeof tickets.length[0] === 'string') return setEventFormStep(4);
      }

      const ticketIndex = tickets.findIndex(!isEmpty);

      setEventFormTicket(ticketIndex);
      return setEventFormStep(4);
    }
    if (isObject(tickets) && isEmpty(tickets)) {
      // return setEventFormStep(4);
    }
  }
  if (promote) {
    if (promote.categories.non_field_errors && promote.categories.non_field_length > 0) {
      return setEventFormStep(5);
    }
  }
  if (refunds) {
    if (refunds.refund_policy && refunds.refund_policy.length > 0) {
      return setEventFormStep(6);
    }
  }
}
