import transactionsModel, { transactionsType } from "./models/transactions";
import { Request, Response } from "express"


type getTransactionFilter = {
  email?: string;
  year?: number;
  month?: number;
  description?: string;
};

export const createTransaction = async (transactions: transactionsType) => {
  const newTimereport = new transactionsModel(transactions);
  await newTimereport.save();
  return newTimereport;
};

export const getTransactions = async () => {
  const transactions = await transactionsModel.find({})
  return transactions;
}

export const getTransactionById = async (transactionId: string) => {
  const transaction = transactionsModel.findOne({id: transactionId})
  return await transaction;
}

export const deleteTransactionById = async (transactionId: string) => {
  const deleteTransaction = transactionsModel.deleteOne({id: transactionId})
  return await deleteTransaction;
}

// getTransactionsMeta()

