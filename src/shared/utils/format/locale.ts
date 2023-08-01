const Locale = {
  'en-GB': {
    dateFormat: 'd MMMM YYYY',
    dateTimeFormat: 'd MMMM YYYY h:mm',
    defaultCurrency: 'USD',
  },
  'en-US': {
    dateFormat: 'MMMM D, YYYY',
    dateTimeFormat: 'MMMM D, YYYY h:mm',
    defaultCurrency: 'USD',
  },
};

export type Locale = keyof typeof Locale;

export const locale = navigator.language as Locale;

export const defaultLocale = Locale['en-US'];

export const getLocale = (value: Locale = locale) => {
  const locale = Locale[value];
  return locale || defaultLocale;
};
