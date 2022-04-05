import { Schema, model } from "mongoose";

export interface settingsType {
  id: Number;
  key: String;
  value: String;
}

const schema = new Schema<settingsType>({
  id: { type: Number, required: true },
  key: { type: String, required: true },
  value: { type: String, required: true },
});

const settingsModel = model<settingsType>("Settings", schema);

export default settingsModel;
