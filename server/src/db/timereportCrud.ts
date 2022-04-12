import TimereportsModel, { timeReportsType } from "./models/timereports";
import { Request, Response } from "express"

export const createTimereport = async (timereport: timeReportsType) => {
  const newTimereport = new TimereportsModel(timereport);
  await newTimereport.save();
  return newTimereport;
};

export const getTimeReport = async () => {
  const timereports = await TimereportsModel.find({})
  return timereports;
}

export const getTimereportById = async (timereportId: string) => {
  const timereport = TimereportsModel.findOne({id: timereportId})
  return await timereport;
}

export const deleteTimereportById = async (timereportId: string) => {
  const deleteTimereport = TimereportsModel.deleteOne({id: timereportId})
  return await deleteTimereport;
}

export const updateTimeReport = async (req: Request, res: Response) => {
 const timeId = req.params.id
 const timeData = req.body;
    try {
      const updateTime = await TimereportsModel.findOneAndUpdate(
        {id: timeId},
        {$set: {...timeData}}
      );
      return res.status(200).json(updateTime)
    } catch(err){ 
      return res.status(400).json(err);
    }
}

// vänta med denna
export const getTimeReportMeta = async () => {
  // const timereports = timereportModel.find({})
  // return await timereports;
}



