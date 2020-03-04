export const generalFields = [
  'eventTitle',
  'hostname',
  'contactEmail',
  'description',
  'cannabisConsumption',
  'organizerContentType',
  'organizerObjectId',
  'isPublic',
  'allowSharing',
];

export const scheduleFields = [
  'startDate',
  'startTime',
  'endDate',
  'endTime',
  'timezone',
];

export const baseLocationFields = ['locationType', 'privateLocation'];
export const onlineLocationFields = ['eventUrl'];
export const physicalLocationFields = [
  'addressName',
  'streetAddress',
  'addressLocality',
  'addressRegion',
  'addressCountry',
  'postalCode',
  'placeId',
  'lat',
  'lng',
];
export const locationFields = [
  ...baseLocationFields,
  ...onlineLocationFields,
  ...physicalLocationFields,
];

export const mediaFields = ['videoURL'];

export const ticketsFields = [
  'ticketName',
  'quantity',
  'type',
  'price',
  'description',
  'feesType',
  'salesStartDate',
  'salesStartTime',
  'salesEndDate',
  'salesEndTime',
  'maxPerOrder',
  'showQuantity',
  'deleteTicket',
  'availability',
];

export const promoteFields = [
  'categories',
  'organizerWebsite',
  'organizerFacebook',
  'organizerInstagram',
  'organizerTwitter',
];

export const refundsFields = ['refundPolicy'];

export default [
  ...generalFields,
  ...scheduleFields,
  ...locationFields,
  ...mediaFields,
  ...ticketsFields,
  ...promoteFields,
  ...refundsFields,
];

/*
CREATE FIELDS SPEC
0: "eventTitle" - required
1: "hostname" - required
2: "contactEmail" - required
3: "description" - required
4: "cannabisConsumption" - required but has initial value
5: "isPublic" - required but has initial value
6: "allowSharing" - must be true unless isPublic === false

7: "startDate" - required
8: "startTime" - required
9: "endDate" - required
10: "endTime" - required

11: "locationType" - required

12: "eventUrl" - required if locationType === 'online'

13: "addressName" - optional
14: "streetAddress" - required if locationType === 'physical'
15: "addressLocality" - required if locationType === 'physical'
16: "addressRegion" - required if locationType === 'physical'
17: "postalCode" - required if locationType === 'physical'
18: "privateLocation" - required if locationType === 'physical'

19: "videoURL" - optional

20: "ticketName" - required
21: "quantity" - required
22: "price" - required
23: "description" - optional
24: "feesType" - only for paid ticket, required but has initial value
25: "salesStartDate" - required but has initial value
26: "salesStartTime" - required but has initial value
27: "salesEndDate" - required but has initial value
28: "salesEndTime" - required but has initial value
29: "maxPerOrder" - required but has initial value
30: "showQuantity" - required but has initial value

31: "categories" - required
32: "organizerWebsite" - optional
33: "organizerFacebook" - optional
34: "organizerInstagram" - optional
35: "organizerTwitter" - optional

36: "refundPolicy" - required
*/
