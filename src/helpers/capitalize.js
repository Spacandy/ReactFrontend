// turns out es6 syntax is the fastest method to declare this function on average
// https://jsperf.com/funcdeclspeedtest/1e
export default function capitalize(str) {
  return str.toLowerCase().replace(/\b\w/g, m => m.toUpperCase());
}
