import TimereportsModel, { timeReportsType } from "./models/timereports";
import { Request, response, Response } from "express"

type getTimeReportFilter = {
      email?: string;
      year?: number;
      month?: number;
      project?: string;
  };
  
export const createTimereport = async (req: Request, res: Response) => {
  const newTimereport = new TimereportsModel();
  newTimereport.email = req.body.email;
  newTimereport.time = req.body.time;
  newTimereport.description = req.body.description;
  newTimereport.hours = req.body.hours;
  newTimereport.project_id= req.body.project_id;

  try {
    await newTimereport.save();
    return res.status(200).json(newTimereport)
  } catch (err) {
    res.status(400).json(err)
  }
};

// export const getTimeReport = async ({
//   email,
//   year,
//   month,
//   project,
// }: getTimeReportFilter) => {
//   let match: any = {};
//     let params = [];
//     if (email) {
//         match.email = email;
//     }
//     if (year) {
//         match.year = year;
//     }
//     if (month) {
//         match.month = Number(month) > 10 ? month : `0${month}`;
//     }
//     if (project) {
//         match.project_id = project;
//     }

//     return await TimereportsModel.aggregate([
//       {
//         $project: {
//           id: 1,
//           email: 1,
//           year: {$substr: ['$time', 0, 4]},
//           month: {$substr: ['$time', 5, 2]},
//           time: 1,
//           description: 1,
//           hours: 1,
//           project_id: 1,
//         }
//       },
//       {
//         $match: match
//       }
//     ])
// }

export const getTimeReport = async (req: Request, res: Response) => {
  const timereports = await TimereportsModel.find({})
  return res.status(200).json(timereports)
}

export const getTimereportById = async (timereportId: String) => {
  const timereport = TimereportsModel.findOne({id: timereportId})
  return await timereport;
}

export const deleteTimereportById = async (timereportId: String) => {
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
// export const getTimeReportMeta = async () => {
//   const timereports = timereportModel.find({})
//   return await timereports;
// }

export const getTimeReportMeta = async (email: string) => {
  if (!email) {
      return [];
  }
  return await TimereportsModel.aggregate([
      { $match: { email } },
      {
          $project: {
              _id: 1,
              time: 1,
              email: 1,
              year: { $substr: ['$time', 0, 4] },
              month: { $substr: ['$time', 5, 2] },
          }
      },
      {
          $group: {
              _id: {
                  year: "$year",
                  month: "$month"
              },
          },
      },
      {
          $project: {
              year: "$_id.year",
              month: "$_id.month",
              _id: 0
          }
      }])
};



