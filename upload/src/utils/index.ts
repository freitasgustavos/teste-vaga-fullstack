/**
 * Converts a number to a string representing a value in the Brazilian
 * Real (BRL) currency.
 *
 * @param {number} value - The number to format.
 *
 * @returns {string} The formatted string.
 */
export const formatNumber = (value: number) => {
  return Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};
