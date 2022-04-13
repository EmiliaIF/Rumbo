import { Schema, model } from "mongoose";

export interface transactionsType {
  id: String;
  email: String;
  time: Date;
  amount: Number;
  description: String;
  created_at: Date;
  status: TransactionStatus;
  source_reference: String;
}

export enum TransactionStatus{
  Final = 0,
  Preliminary = 1,
  Rejected = 2
}

const schema = new Schema<transactionsType>({
  id: { type: String, required: true },
  email: { type: String, required: true },
  time: { type: Date, required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  created_at: { type: Date, required: true },
  status: { type: Number,
    enum: [0, 1, 2],
    default: 0 },
  source_reference: { type: String, required: true },
});

const transactionsModel = model<transactionsType>("Transactions", schema);

export default transactionsModel;
