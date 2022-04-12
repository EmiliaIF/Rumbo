import timereportModel, { timeReportsType } from "./models/timereports";

export const createTimereport = async (timereport: timeReportsType) => {
  const newTimereport = new timereportModel(timereport);
  await newTimereport.save();
  return newTimereport;
};

export const getTimereportById = async (timereportId: string) => {
  const timereport = timereportModel.findOne({id: timereportId})
  return await timereport;
}

export const deleteTimereportById = async (timereportId: string) => {
  const deleteTimereport = timereportModel.deleteOne({id: timereportId})
  return await deleteTimereport;
}




