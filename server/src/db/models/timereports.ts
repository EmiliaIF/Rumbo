import { Schema, model } from "mongoose";

export interface timeReportsType {
  // id: Number;
  email: String;
  time: Date;
  hours: Number;
  description: String;
  created_at: Date;
  project_id: Number;
}

const schema = new Schema<timeReportsType>({
  // id: { type: Number, required: true },
  email: { type: String, required: true },
  time: { type: Date, required: true },
  hours: { type: Number, required: true },
  description: { type: String, required: true },
  created_at: { type: Date, required: true },
  project_id: { type: Number, required: true },
});

const timeReportsModel = model<timeReportsType>("TimeReports", schema);

export default timeReportsModel;
