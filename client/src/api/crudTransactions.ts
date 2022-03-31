import { Transaction } from '../types';

export const getTransactions = (jwtToken: string, email: string, year?: number, month?: number, description?: string) => {
  let queries = [];
  if (year) {
    queries.push(`year=${year}`);
  }
  if (month) {
    queries.push(`month=${month}`);
  }
  if (description) {
    queries.push(`description=${description}`);
  }
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/user/${email}/transaction${queries.length ? "?" + queries.join("&") : ""}`, {
    headers: { authorization: `bearer ${jwtToken}` },
  }).then((res: any) => res.json());
};

export const getTransactionsMeta = (jwtToken: string, email: string) => {
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/user/${email}/transactionsmeta`, {
      headers: { authorization: `bearer ${jwtToken}` },
    }).then((res: any) => res.json());
  };
  
  export const postTransaction = (jwtToken: string, transaction: Transaction) => {
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/transaction`, {
      method: 'POST',
      body: JSON.stringify(transaction),
      headers: { authorization: `bearer ${jwtToken}`, 'Content-Type': 'application/json' },
    }).then((res: any) => res.json());
  };

  export const deleteTransaction = (jwtToken: string, transaction: Transaction) => {
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/transaction/${transaction.id}`, {
      method: 'DELETE',
      headers: { authorization: `bearer ${jwtToken}`, 'Content-Type': 'application/json' },
    }).then((res: any) => res.json());
  };
  