export default price => {
  if (Number(price) === 0) {
    return true;
  }
  return false;
};
