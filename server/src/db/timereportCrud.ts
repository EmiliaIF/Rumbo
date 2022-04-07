import timereportModel, { timeReportsType } from "./models/timereports";

export const createTimereport = async (timereport: timeReportsType) => {
  const newTimereport = new timereportModel(timereport);
  await newTimereport.save();
  return newTimereport;
};
