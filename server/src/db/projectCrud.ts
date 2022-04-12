import projectModel, { projectType } from "./models/project";
import {Response, Request} from 'express'

// export const createProject = async (project: projectType) => {
//   const newProject = new projectModel(project);
//   await newProject.save();
//   return newProject;
// };

// export const getProjects = async (
//   email?: string
// ) => {
//   let whereClause = '';
//   let params = [];
//   if (email) {
//       whereClause = `WHERE public.employees.email = $1`;
//       params = [ email ]
//   }

//   const sqlQuery = `SELECT public.projects.id, public.projects.project_name FROM public.projects`;
  
//   return query(sqlQuery, params);
// }

export const getProject = async (req: Request, res: Response) => {
  if (req['isAdmin']) {
      return res.send(401).end();
  }
  try {
    const project = await projectModel.find()
      return res.status(200).json(project);
  } catch (err) {
      return res.status(400).json(err);
  }
};

// export const getProjects = async (req: Request, res:Response) => {
//   const project = await projectModel.find({})
//   return res.status(200).json(project)
// };
