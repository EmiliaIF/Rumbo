import employeeModel, { EmployeeType } from "./models/employee";
import { Request, Response} from 'express';

// export const createEmployee = async (employee: EmployeeType) => {
//   const newEmployee = new employeeModel(employee);
//   await newEmployee.save();
//   return newEmployee;
// };

export const readEmployees = async (req: Request, res: Response) => {
  const employees = await employeeModel.find({})
  return res.status(200).json(employees)
};
