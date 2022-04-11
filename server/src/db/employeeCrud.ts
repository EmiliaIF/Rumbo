import employeeModel, { employeeType } from "./models/employee";
import { Request, Response} from 'express';

export const createEmployee = async (employee: employeeType) => {
  const newEmployee = new employeeModel(employee);
  await newEmployee.save();
  return newEmployee;
};

export const readEmployees = async (req: Request, res:Response) => {
  const employees = await employeeModel.find()
  return res.status(200).json(employees)
};

// export const readEmployees = async (req: Request, res: Response) => {
//   const employee = req.params.body;
//   try {
//       const employees = await employeeModel.find({ employee });
//       return res.status(200).json(employees);
//   } catch (err) {
//       return res.status(400).json(err);
//   }
// };