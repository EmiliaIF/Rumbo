import express from 'express';
import { getCustomers } from "../eaccounting";

const router = express.Router();

router.get("/customers", (req, res) => {
  getCustomers().then((data) => res.json(data));
});

export default router;