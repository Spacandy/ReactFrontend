export default ticket => {
  if (ticket.itemType === 'ticket')
    return Number(ticket.creditCardFee) + Number(ticket.serviceFee);
  if (ticket.itemType === 'sponsorship') return Number(ticket.price) * 0.059 + 0.99;
};
