import { Schema, model } from "mongoose";

export interface SettingsType {
  id: Number;
  key: String;
  value: String;
}

const schema = new Schema<SettingsType>({
  id: { type: Number, required: true },
  key: { type: String, required: true },
  value: { type: String, required: true },
});

const settingsModel = model<SettingsType>("Settings", schema);

export default settingsModel;
