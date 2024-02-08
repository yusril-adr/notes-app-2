import { setLocale } from 'yup';

export const convertSearchParams = (params) => {
  const result = {};

  params.forEach((val, key) => {
    result[key] = val;
  });

  return result;
};

export const initYupLocalize = (t) => {
  setLocale({
    mixed: {
      required: t('This field cannot be empty.'),
    },
    string: {
      min: ({ min }) => t('This field length min is {{number}}.', { number: min }),
      max: ({ max }) => t('This field length max is {{number}}.', { number: max }),
    },
  });
};
