export default (errorArray, field, nfe = false) => {
  if (errorArray) {
    if (errorArray.hasOwnProperty(field)) {
      console.log('*=**1', nfe, typeof errorArray);
      if (nfe && errorArray) {
        if (errorArray[field].hasOwnProperty('non_field_errors'))
          return errorArray[field]['non_field_errors'][0];
      }

      if (errorArray[field] !== null) return errorArray[field][0];
      return undefined;
    }
    return undefined;
  }
  return undefined;
};
