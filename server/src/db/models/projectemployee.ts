import { Schema, model } from "mongoose";

export interface projectEmployeeType {
  project_id: Number;
  employee_id: Number;
}

const schema = new Schema<projectEmployeeType>({
  project_id: { type: Number, required: true },
  employee_id: { type: Number, required: true },
});

const projectEmployeeModel = model<projectEmployeeType>(
  "project_employee",
  schema
);

export default projectEmployeeModel;
