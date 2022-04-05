import employeeModel, { employeeType } from "./models/employee";

export const createEmployee = async (employee: employeeType) => {
  const newEmployee = new employeeModel(employee);
  await newEmployee.save();
  return newEmployee;
};



