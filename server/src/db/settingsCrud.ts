import settingsModel, { SettingsType } from "./models/settings";


export const createSetting = async (settings: SettingsType) => {
  const newSettings = new settingsModel(settings);
  await newSettings.save();
  return newSettings;
};

export const getSetting = async (key: string) => {
  const result = await settingsModel.find({key}) as SettingsType[];
  return result.length ? result[0].value : null;
}

export const setSetting = async (req?: Request, res?: string) => {
  // const settingId = req.params.id;
  // const setting = await settingId.findOne({id: settingId});
  const setting = await settingsModel.findOne({ ? });
  const result = setting[res];
  return result.length ? result[0].value : null && setting;
};

