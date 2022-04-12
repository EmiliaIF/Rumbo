// import express from "express";
// import { getTransactions, getTransactionsMeta, filterOutExistingTransactions } from "../db/transaction";
// import { getTimeReport, getTimeReportMeta } from "../db/timereport";
// import { getSalaryTransactions } from "../eaccounting";

// const router = express.Router();

// //isAdmin "skapas" i auth.ts -> auth.ts används sedan i server.ts (main-app) -> används sedan här via (?) main-app...
// router.get("/:email/transaction", async (req, res) => {
//   if (req.params.email != req["user"] && req["isAdmin"]) {
//     res.sendStatus(401).end();
//   } else {
//     let filter: any = {
//       email: req.params.email,
//     };
//     if (req.query.user) {
//       console.log(req["user"]);
//     }
//     if (req.query.year) {
//       filter.year = req.query.year;
//     }
//     if (req.query.month) {
//       filter.month = req.query.month;
//     }
//     if (req.query.description) {
//       filter.description = req.query.description;
//     }
//     const transactions = await getTransactions(filter);
//     res.json(transactions);
//   }
// });

// // TODO skapa en project route? 

// router.get("/:email/timereport", async (req, res) => {


//   if (req.params.email != req["user"] && req["isAdmin"]) {
//     res.sendStatus(401).end();
//   } else {
//     let filter: any = {
//       email: req.params.email,
//     };

//     if (req.query.user) {
//       console.log(req["user"]);
//     }
//     if (req.query.year) {
//       filter.year = req.query.year;
//     }
//     if (req.query.month) {
//       filter.month = req.query.month;
//     }
//     if (req.query.project_id) {
//       filter.project = req.query.project_id;
//     }
//     const timeReport = await getTimeReport(filter);
//     console.log(timeReport);
//     const mappedReports = timeReport.map((timereport) => ({ ...timereport, hours: Number(timereport.hours) }))
//     res.json(mappedReports);
//   }

// });

// router.get("/:email/transactionsmeta", async (req, res) => {
//   if (req.params.email != req["user"] && req["isAdmin"]) {
//     res.sendStatus(401).end();
//   } else {
//     const transactionsMeta: any = await getTransactionsMeta(req.params.email);
//     if (!transactionsMeta.length) {
//       res.json([{ year: (new Date()).getFullYear(), month: (new Date()).getMonth() + 1 }])
//     } else {
//       res.json(transactionsMeta);
//     }
//   }
// });

// router.get("/:email/timereportmeta", async (req, res) => {
//   if (req.params.email != req["user"] && req["isAdmin"]) {
//     res.sendStatus(401).end();
//   } else {
//     const timeReportMeta: any = await getTimeReportMeta(req.params.email);
//     if (!timeReportMeta.length) {
//       res.json([{ year: (new Date()).getFullYear(), month: (new Date()).getMonth() + 1 }])
//     } else {
//       res.json(timeReportMeta);
//     }
//   }
// })

// router.get("/:email/import-visma", async (req, res) => {
//   if (req["isAdmin"]) {
//     res.sendStatus(401).end();
//   } else {
//     const salaryTransactions = await getSalaryTransactions(2021, 12, "Liss Carl Martin Jonatan Hallenberg");
//     console.log('salaryTransactions', salaryTransactions);
//     const filteredTransactions = await filterOutExistingTransactions(salaryTransactions);
//     res.json(filteredTransactions);
//   }
// })

// export default router;
