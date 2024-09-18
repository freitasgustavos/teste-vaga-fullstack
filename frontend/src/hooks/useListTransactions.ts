import { useQuery, QueryFunctionContext } from "@tanstack/react-query";
import { api } from "../services/api";
import type { ITransactionList } from "../types";

const listTransactions = async ({ queryKey }: QueryFunctionContext) => {
  const [, page] = queryKey;

  const { data } = await api.get<ITransactionList>(`/transaction?page=${page}`);

  return data;
};

export const useListTransactions = (page: number) => {
  const query = useQuery({
    queryKey: ["listTransactions", page],
    queryFn: listTransactions,
  });

  return query;
};
