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

/**
 * Validates a CPF (Brazilian Individual Taxpayer ID Number) according to
 * the official algorithm.
 *
 * @param {string} cpf - The CPF to validate.
 *
 * @returns {boolean} `true` if the CPF is valid, `false` otherwise.
 */
export const validateCPF = (cpf: string): boolean =>{
  if (cpf.length !== 11) {
      return false;
  }

  if (/^(\d)\1*$/.test(cpf)) {
      return false;
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let firstCheckDigit = 11 - (sum % 11);
  if (firstCheckDigit >= 10) {
      firstCheckDigit = 0;
  }

  sum = 0;
  for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  let secondCheckDigit = 11 - (sum % 11);
  if (secondCheckDigit >= 10) {
      secondCheckDigit = 0;
  }

  return cpf.charAt(9) === firstCheckDigit.toString() && cpf.charAt(10) === secondCheckDigit.toString();
}

/**
 * Validates a CNPJ (Brazilian National Registry of Legal Entities) according
 * to the official algorithm.
 *
 * @param {string} cnpj - The CNPJ to validate.
 *
 * @returns {boolean} `true` if the CNPJ is valid, `false` otherwise.
 */
export const validateCNPJ = (cnpj: string): boolean => {
  if (cnpj.length !== 14) {
      return false;
  }

  if (/^(\d)\1*$/.test(cnpj)) {
      return false;
  }

  let sum = 0;
  let weight = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 12; i++) {
      sum += parseInt(cnpj.charAt(i)) * weight[i];
  }
  let firstCheckDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  sum = 0;
  weight = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 13; i++) {
      sum += parseInt(cnpj.charAt(i)) * weight[i];
  }
  let secondCheckDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  return cnpj.charAt(12) === firstCheckDigit.toString() && cnpj.charAt(13) === secondCheckDigit.toString();
}

/**
 * Validates a CPF or CNPJ, using the respective validation functions.
 *
 * @param {string} value - The CPF or CNPJ to validate.
 *
 * @returns {boolean} `true` if the CPF or CNPJ is valid, `false` otherwise.
 */
export const validateCPFOrCNPJ = (value: string): boolean => {
  if (value.length === 11) {
      return validateCPF(value);
  } else if (value.length === 14) {
      return validateCNPJ(value);
  }
  return false;
}
