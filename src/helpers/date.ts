/* eslint-disable @typescript-eslint/no-magic-numbers */

type DateString = string & { __brand: 'date' };

/**
 * Format a string date to the YYYY-MM-DD format, for `<time></time>`tag usage
 * Timezone compatible.
 */
function formatDateToISO(dateStr: DateString) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * Format a date to print a text such as "April 1, 2024" or "17 janvier 2025"
 */
function formatDateToLongFormat(dateStr: DateString) {
  const date = new Date(dateStr);
  const formatter = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return formatter.format(date);
}

export { type DateString, formatDateToISO, formatDateToLongFormat };
