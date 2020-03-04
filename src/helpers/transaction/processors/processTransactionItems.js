import calculateItemSubtotal from '../calculators/calculateItemSubtotal';
import calculateTicketFees from '../calculators/calculateTicketFees';
import calculateSponsorshipFees from '../calculators/calculateSponsorshipFees';

export default (rawItems, selectedItems) => {
  let processedItems = [];
  let filteredItems = rawItems.filter(item => item.active === true);
  if (selectedItems) {
    if (filteredItems.length > 0 && filteredItems[0].itemType === 'ticket') {
      Object.keys(selectedItems).map(key => {
        const newKey = key.slice(1);
        const foundTicket = filteredItems.find(x => x.id === newKey);

        if (foundTicket) {
          const price = Number(foundTicket.price);
          const quantity = Number(selectedItems[key]);
          const feeType = foundTicket.feesType;
          const itemType = 'ticket';
          const newTicket = {
            ticketId: newKey,
            ticketName: foundTicket.ticketName,
            quantity,
            itemType,
            price,
            feeType,
            fees: calculateTicketFees(price, feeType),
            subtotal: calculateItemSubtotal(price, quantity, 'ticket', feeType),
          };

          processedItems.push(newTicket);
        }
      });
    }
    if (filteredItems.length > 0 && filteredItems[0].itemType === 'sponsorship') {
      Object.keys(selectedItems).map(key => {
        const newKey = key.slice(1);
        const foundSponsorship = filteredItems.find(x => x.id === newKey);
        if (foundSponsorship) {
          const price = Number(foundSponsorship.price);
          const quantity = Number(selectedItems[key]);
          const feeType = foundSponsorship.feesType;
          const itemType = 'sponsorship';
          const newSponsorship = {
            sponsorshipId: newKey,
            sponsorshipName: foundSponsorship.ticketName,
            quantity,
            itemType,
            price,
            feeType,
            fees: calculateSponsorshipFees(price, feeType),
            subtotal: calculateItemSubtotal(price, quantity, itemType, feeType),
          };

          processedItems.push(newSponsorship);
        }
      });
    }
  }

  const filteredEvents = processedItems.filter(e => e.quantity > 0);
  return filteredEvents;
};
