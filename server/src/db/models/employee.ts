import { Schema, model } from "mongoose";

export interface EmployeeType {
  // id: number;
  email: string;
  firstname: string;
  lastname: string;
}

const schema = new Schema<EmployeeType>({
  // id: { type: Number, required: true },
  email: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
}, {timestamps: true});

const employeeModel = model<EmployeeType>("Employee", schema);

export default employeeModel;
