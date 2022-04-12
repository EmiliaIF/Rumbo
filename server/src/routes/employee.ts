import express, { Request, Response} from "express";
import { readEmployees } from "../db/employeeCrud";
import { EmployeeType } from "../db/models/employee";
// import { createEmployee } from "../db/employeeCrud";

const router = express.Router();

router.get("/", readEmployees)

// mongoose
// router.post("/", async (req: Request, res: Response) => {
//   const createdEmployee: EmployeeType = await createEmployee(req.body);
//   res.status(201).json(createdEmployee);
// });

export default router;



// router.get("/", async (req, res) => {
//   const employee = await readEmployees;
//   res.json(employee);
// });