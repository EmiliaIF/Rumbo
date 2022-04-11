import employeeModel, { employeeType } from "./models/employee";

export const createEmployee = async (employee: employeeType) => {
  const newEmployee = new employeeModel(employee);
  await newEmployee.save();
  return newEmployee;
};

export const getEmployee = async (employee: employeeType) => {
  const readEmployee = new employeeModel(employee);
  await readEmployee.save();
  return readEmployee;
};