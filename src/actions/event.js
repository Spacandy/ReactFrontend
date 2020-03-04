export const SET_EVENT_ID = 'SET_EVENT_ID';
export const SET_EVENT_SLUG = 'SET_EVENT_SLUG';

export function setEventId(id) {
  return {
    type: SET_EVENT_ID,
    data: {
      eventId: id,
    },
  };
}
export function setEventSlug(slug, published) {
  return {
    type: SET_EVENT_SLUG,
    data: {
      eventSlug: slug,
      published: published,
    },
  };
}
