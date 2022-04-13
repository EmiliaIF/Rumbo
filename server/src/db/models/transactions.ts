import { Schema, model } from "mongoose";

export interface transactionsType {
  id: String;
  email: String;
  time: Date;
  amount: Number;
  description: String;
  created_at: Date;
  status: Number;
  source_reference: String;
}

const schema = new Schema<transactionsType>({
  id: { type: String, required: true },
  email: { type: String, required: true },
  time: { type: Date, required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  created_at: { type: Date, required: true },
  status: { type: Number, required: true },
  source_reference: { type: String, required: true },
});

const transactionsModel = model<transactionsType>("Transactions", schema);

export default transactionsModel;
