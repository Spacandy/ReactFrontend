const roundNumber = value => {
  let newValue = +value;

  if (isNaN(newValue)) return NaN;

  // Shift
  newValue = newValue.toString().split('e');
  newValue = Math.round(+(newValue[0] + 'e' + (newValue[1] ? +newValue[1] + 2 : 2)));

  // Shift back
  newValue = newValue.toString().split('e');
  return Number(
    (+(newValue[0] + 'e' + (newValue[1] ? +newValue[1] - 2 : -2))).toFixed(2),
  );
};

export default roundNumber;
