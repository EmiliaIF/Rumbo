import express, { Request, Response} from "express";
import { getEmployees } from "../db/employee";
import { employeeType } from "../db/models/employee";
import { createEmployee } from "../db/employeeCrud";

const router = express.Router();

// router.get("/", async (req, res) => {
//   const employees = await getEmployees();
//   res.json(employees);
// });

// mongoose
router.post("/", async (req: Request, res: Response) => {
  const createdEmployee: employeeType = await createEmployee(req.body);
  res.status(201).json(createdEmployee);
});

export default router;
