import { query } from "./db";
import { Transaction, TransactionStatus } from "../types";

type getTransactionFilter = {
  email?: string;
  year?: number;
  month?: number;
  description?: string;
};

export const getTransactions = async ({
  email,
  year,
  month,
  description,
}: getTransactionFilter) => {
  let where = [`"status" = 0`];
  let params = [];
  if (email) {
    params.push(email);
    where.push(`email = $${params.length}`);
  }
  if (year) {
    params.push(year);
    where.push(`DATE_PART('year',"time") = $${params.length}`);
  }
  if (month) {
    params.push(month);
    where.push(`DATE_PART('month',"time") = $${params.length}`);
  }
  if (description) {
    description = `%${description}%`;
    params.push(description);
    where.push(`LOWER("description") LIKE LOWER($${params.length})`)
  }
  const whereClause = !where.length ? "" : "WHERE " + where.join(" AND ");
  const sqlQuery = `SELECT * FROM (SELECT id, email, "time", amount, description, status, SUM(amount) OVER ( PARTITION BY email ORDER BY "time", id ) FROM public.transactions) AllTransactions ${whereClause}`;
  return await query(sqlQuery, params);
};

export const getTransactionById = async (transactionId: number) => {
  const sqlQuery = `SELECT * FROM public.transactions WHERE id = $1`;
  const result = await query(sqlQuery, [transactionId]);
  return result['length'] === 0 ? null : result[0];
};

export const deleteTransactionById = async (transactionId: number) => {
  const sqlQuery = `DELETE FROM public.transactions WHERE id = $1`;
  await query(sqlQuery, [transactionId]);
};

export const getTransactionsMeta = async (email: string) => {
  const sqlQuery = `SELECT
                      EXTRACT(year from time) as year,
                      EXTRACT(month from time) as month
                    FROM
                      (SELECT * FROM transactions WHERE email = $1 AND status = 0) as nested
                    GROUP BY EXTRACT(month from time), EXTRACT(year from time)
                    ORDER BY year, month`;
  const res: any = await query(sqlQuery, [email]);
  return res.map(meta => ({ year: Number(meta.year), month: Number(meta.month) }));
};

export const addTransaction = (transaction: Transaction) => {
  return query(
    'INSERT INTO public.transactions(email, "time", amount, description, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [
      transaction.email,
      transaction.time,
      transaction.amount,
      transaction.description,
      TransactionStatus.Final
    ]
  ).then((res) => res);
};

export const filterOutExistingTransactions = async (transactions: Transaction[]): Promise<Transaction[]> => {
  if (transactions.length === 0) {
    return [];
  }
  const sqlQuery = `SELECT source_reference FROM "transactions" WHERE source_reference in (${transactions.map((transaction, index) => "$" + (index + 1)).join(", ")})`;
  const params = transactions.map(transaction => transaction.sourceReference);
  const existingTransactionSourceReferences = (await query(sqlQuery, params) as any[])
    .map(existingTransaction => existingTransaction.source_reference);
  return transactions.filter(transaction => existingTransactionSourceReferences.indexOf(transaction.sourceReference) === -1);
}