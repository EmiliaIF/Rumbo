import transactionsModel, { transactionsType, TransactionStatus } from "./models/transactions";
import { Request, Response } from "express"


type getTransactionFilter = {
  email?: string;
  year?: number;
  month?: number;
  description?: string;
};

// export const createTransaction = async (transactions: transactionsType) => {
//   const newTimereport = new transactionsModel(transactions);
//   await newTimereport.save();
//   return newTimereport;
// };

export const createTransaction = async (req: Request, res: Response) => {
  const newTransaction = new transactionsModel();
  newTransaction.email = req.body.email;
  newTransaction.time = req.body.time;
  newTransaction.amount = req.body.amount;
  newTransaction.description = req.body.description;
  newTransaction.status = TransactionStatus.Final;
  try {
    await newTransaction.save();
    return newTransaction;
  } catch (err) {
    res.status(400).json(err)
  }
};


export const getTransactions = async (req: Request, res: Response) => {
  const transactions = await transactionsModel.find({})
  // return transactions;
  return res.status(200).json(transactions)
}

export const getTransactionById = async (req: Request, res: Response) => {
  const transaction = await transactionsModel.findById(req.params.transactionId)
  return res.status(200).json(transaction);
}

export const deleteTransactionById = async (transactionId: string) => {
  const deleteTransaction = await transactionsModel.deleteOne({'_ id': transactionId})
  // console.log(transactionId);
  return  deleteTransaction;
}

export const getTransactionsMeta = async (email: string) => {
  if (!email) {
      return [];
  }
  const res = await transactionsModel.aggregate([
      { $match: { email } },
      {
          $project: {
              _id: 1,
              time: 1,
              email: 1,
              year: { $substr: ['$time', 0, 4] },
              month: { $substr: ['$time', 5, 2] },
          }
      },
      {
          $group: {
              _id: {
                  year: "$year",
                  month: "$month"
              },
          },
      },
      {
          $project: {
              year: "$_id.year",
              month: "$_id.month",
              _id: 0
          }
      }]);

  return res.map(meta => ({ year: Number(meta.year), month: Number(meta.month) }));
};

