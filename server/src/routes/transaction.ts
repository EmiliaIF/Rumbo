import express from 'express';
import { getDescriptionByEmail } from '../db/descriptionCrud'
import { getTransactions, getTransactionById, deleteTransactionById, createTransaction } from '../db/transactionsCrud'
import { validationResult } from "express-validator";

const router = express.Router();


// router.get("/getemail", getDescriptionByEmail)

router.get("/", getTransactions)
router.get("/:transactionId", getTransactionById)
router.delete("/:transactionsId", deleteTransactionById)

// router.get('/transactions/:id',  (req, res) => {
//     Item.find({id:req.params.id}, (err, items) => {
//      if (err) res.status(500).send(error)
 
//      res.status(200).json(items);
//    });
//  });


// router.delete("/:transactionId", async (req, res) => {
//   if (req["isAdmin"]) {
//     res.sendStatus(401).end();
//   } else {
//     const transactionId = (req.params.transactionId);
//     console.log("IS HERE");

//     if (!transactionId) {
//       return res.sendStatus(400);
//     } else {
//       const transaction = await getTransactionById(transactionId);
//       if (!transaction) {
//         res.sendStatus(404);
//       } else {
//         await deleteTransactionById(transactionId);
//         res.json(transaction);
//       }
//     }

//     res.json();
//   }
// });

// router.get("/", async (req, res) => {
//   let filter: any = {
//     email: req["user"],
//   };

//   if (req.query.user) {
//     console.log(req["user"]);
//   }
//   if (req.query.year) {
//     filter.year = req.query.year;
//   }
//   if (req.query.month) {
//     filter.month = req.query.month;
//   }
//   await getTransactions( req,filter).then((transactions) => res.json(transactions));
// });

// router.post("/", async (req, res) => {
//   if (req["isAdmin"]) {
//     res.sendStatus(401).end();
//   } else {

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     const newTransaction = await createTransaction(req, res);
//     res.json(newTransaction);
//   }
// });

  export default router;