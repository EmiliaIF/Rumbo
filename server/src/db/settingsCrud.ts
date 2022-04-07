import settingsModel, { settingsType } from "./models/settings";

export const createTimereport = async (settings: settingsType) => {
  const newSettings = new settingsModel(settings);
  await newSettings.save();
  return newSettings;
};

