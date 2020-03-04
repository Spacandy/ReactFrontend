// @flow

type Event = {
  id: number,
  canceled: boolean,
  published: boolean,
};

export type Props = {
  data: {
    hostedEvents: {
      map: Function,
    },
  },
  children: mixed,
};

export type State = {
  event: Event | null,
  eventName: string,
  confirmationDialogSubject: string,
  confirmationDialogOpen: boolean,
};
