// @flow

type Ticket = {
  id: number,
  name: string,
  price: string | number,
  showQuantity: boolean,
  remaining: number | string,
  saleEndDate: string,
  maxPerOrder: number | string,
  description: string,

  map: Function,
};
type User = {
  firstName: string,
  lastName: string,
  displayName: string,
  email: string,
};

export type Props = {
  onClose: Function,
  dispatch: Function,
  authenticated: boolean,
  fullScreen: boolean,
  isTicketsModalOpen: boolean,
  tickets: [Ticket],
  classes: {},
  user: User,
  client: {
    query: Function,
  },

  mutate: Function,
};
export type State = {
  indexOpen: number | null,
  quantity: number,
  canBuy: boolean,
  confirmationDialogOpen: boolean,
};
