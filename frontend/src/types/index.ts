export interface ILayoutProps {
  children: React.ReactNode;
}

export type ITransaction = {
  nmClient: string;
  nrCpfCnpj: string;
  qtPrestacoes: number;
  vlPresta: number;
  vlMora: number;
  vlMulta: number;
  vlAtual: number;
  idSituac: string;
  vlCorreto: string;
  validateCpfCnpj: string;
};

export type IPagination = {
  page: number;
  total: number;
}

export interface ITransactionList {
  transactions: ITransaction[];
  pagination: IPagination;
}
