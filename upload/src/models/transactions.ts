import { Schema, model } from "mongoose";

const transactionSchema = new Schema({
  nmClient: String,
  nrCpfCnpj: String,
  vlTotal: String,
  idSituac: String,
  qtPrestacoes: Number,
  vlAtual: String,
  vlMora: String,
  vlMulta: String,
  vlPresta: String,
  vlCorreto: String,
  validateCpfCnpj: String,
});

export const Transactions = model("Transactions", transactionSchema);