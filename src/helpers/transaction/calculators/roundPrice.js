export default (num, outputType = 'number') => {
  if (num && num > 0) {
    if (outputType === 'number' && typeof num === 'number') return +num.toFixed(2);
    if (outputType === 'string' && typeof num === 'string') return Number(num).toFixed(2);
  }
  return 0;
};
