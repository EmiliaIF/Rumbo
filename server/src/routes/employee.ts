import express from 'express';
import { getEmployees } from "../db/employee";

const router = express.Router();

router.get('/', async (req, res) => {
  const employees = await getEmployees();
  res.json(employees);
})

export default router;