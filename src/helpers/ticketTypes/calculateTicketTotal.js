export default (price, fees, feesType = 'pass') => {
  if (feesType === 'absorb') return Number(price);
  return Number(price) + Number(fees);
};
