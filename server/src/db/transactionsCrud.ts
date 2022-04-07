import transactionsModel, { transactionsType } from "./models/transactions";

export const createTimereport = async (transactions: transactionsType) => {
  const newTimereport = new transactionsModel(transactions);
  await newTimereport.save();
  return newTimereport;
};

