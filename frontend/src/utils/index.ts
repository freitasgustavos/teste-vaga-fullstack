/**
 * Adds a mask to a given document, either a CPF or a CNPJ, after validation.
 *
 * @param {string} document The document to add the mask to.
 * @returns {string | null} The document with the mask added, or `null` if it is invalid.
 */
export const addMask = (document: string): string | null => {
  document = document.replace(/\D/g, "");

  if (document.length <= 11) {
    document = document.replace(/(\d{3})(\d)/, "$1.$2");
    document = document.replace(/(\d{3})(\d)/, "$1.$2");
    document = document.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else {
    document = document.replace(/(\d{2})(\d)/, "$1.$2");
    document = document.replace(/(\d{3})(\d)/, "$1.$2");
    document = document.replace(/(\d{3})(\d)/, "$1/$2");
    document = document.replace(/(\d{4})(\d{1,2})$/, "$1-$2");
  }

  return document;
};
