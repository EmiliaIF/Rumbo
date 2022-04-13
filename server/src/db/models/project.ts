import { Schema, model } from "mongoose";

export interface projectType {
  // id: Number;
  customer_name: String;
  project_name: String;
  agreement_ref: String;
  active: Boolean;
  created_at: Date;
}

const schema = new Schema<projectType>({
  // id: { type: Number, required: true },
  customer_name: { type: String, required: true },
  project_name: { type: String, required: true },
  agreement_ref: { type: String, required: true },
  active: { type: Boolean, required: true },
  created_at: { type: Date, required: true },
});

const projectModel = model<projectType>("project", schema);

export default projectModel;


