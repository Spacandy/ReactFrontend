import isArray from 'helpers/isArray';
import isObject from 'helpers/isObject';
import isEmpty from 'helpers/isEmpty';

export default function detectErrors(errors, setErrors) {
  const { general, where, when, tickets, promote, refunds } = errors;
  let generalError = false;
  let whereError = false;
  let whenError = false;
  let ticketsError = false;
  let promoteError = false;
  let refundsError = false;

  if (general) {
    if (general.title && general.title.length > 0) {
      generalError = true;
    }
    if (general.hostname && general.hostname.length > 0) {
      generalError = true;
    }
    if (general.contactEmail && general.contactEmail.length > 0) {
      generalError = true;
    }
  }
  if (where) {
    if (where.location_type && where.location_type.length > 0) {
      whereError = true;
    }

    if (
      where.online_location &&
      where.online_location.url &&
      where.online_location.url.length > 0
    ) {
      whereError = true;
    }
    if (
      where.physical_location &&
      where.physical_location.address_locality &&
      where.physical_location.address_locality.length > 0
    ) {
      whereError = true;
    }
    if (
      where.physical_location &&
      where.physical_location.address_region &&
      where.physical_location.address_region.length > 0
    ) {
      whereError = true;
    }
    if (
      where.physical_location &&
      where.physical_location.postal_code &&
      where.physical_location.postal_code.length > 0
    ) {
      whereError = true;
    }

    if (
      where.physical_location &&
      where.physical_location.street_address &&
      where.physical_location.street_address.length > 0
    ) {
      whereError = true;
    }
  }
  if (when) {
    if (when.startDate && when.startDate.length > 0) {
      whenError = true;
    }
    if (when.endDate && when.endDate.length > 0) {
      whenError = true;
    }
    if (when.startTime && when.startTime.length > 0) {
      whenError = true;
    }
    if (when.endTime && when.endTime.length > 0) {
      whenError = true;
    }
  }
  if (tickets) {
    if (isArray(tickets)) {
      if (isEmpty(tickets)) {
        ticketsError = true;
      }
      if (tickets.length === 1) {
        if (typeof tickets.length[0] === 'string') ticketsError = true;
      }
      ticketsError = true;
    }
    if (isObject(tickets) && isEmpty(tickets)) {
      // return ticketsError = true;
    }
  }
  if (promote) {
    if (
      promote.categories.non_field_errors &&
      promote.categories.non_field_errors.length > 0
    ) {
      promoteError = true;
    }
  }
  if (refunds) {
    if (refunds.refund_policy && refunds.refund_policy.length > 0) {
      refundsError = true;
    }
  }

  return setErrors({
    generalError,
    whereError,
    whenError,
    ticketsError,
    promoteError,
    refundsError,
  });
}
