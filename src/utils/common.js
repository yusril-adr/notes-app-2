/* eslint-disable import/prefer-default-export */
export const convertSearchParams = (params) => {
  const result = {};

  params.forEach((val, key) => {
    result[key] = val;
  });

  return result;
};
