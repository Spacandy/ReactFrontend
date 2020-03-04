import isObject from 'helpers/isObject';
export default function isArray(obj) {
  return isObject(obj) && obj instanceof Array;
}
