import { Schema, model } from "mongoose";

export interface employeeType {
  // id: number;
  email: string;
  firstname: string;
  lastname: string;
}

const schema = new Schema<employeeType>({
  // id: { type: Number, required: true },
  email: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
});

const employeeModel = model<employeeType>("Employee", schema);

export default employeeModel;
