export const transformToArray = (values) => {
  return Object.keys(values).map(key => {
    return {
      ...values[key],
      id: key
    }
  })
};
