import express from "express";
import auth from "./auth";
import dotenv from "dotenv";
import { addTransaction, getTransactions, getTransactionById, deleteTransactionById } from "./db/transaction";
import { getEmployees } from "./db/employee";
import { validationResult } from "express-validator";
import { getCustomers, refreshToken } from "./eaccounting";
import userRouter from './routes/user';
import { addTimeReport, getTimeReport, getTimeReportById, deleteTimeReportById, updateTimeReport } from "./db/timereport";
import { getProjects } from "./db/project";
import { getDescriptionsByEmail } from "./db/description";
import { TimeReport } from "./types";
import { getSetting, setSetting } from './db/setting';  

const env = process.env.ENV || 'local';
dotenv.config({ path: `config/${env}.env` });
if (env === 'local') {
  dotenv.config({ path: `../config/global.${env}.env` });
} else {
  dotenv.config({ path: `config/global.${env}.env` });
}

const app = express();
const port = 4000;
app.use(auth);
app.use(express.json());

if (process.env.VISMA_IMPORT_FEATURE === 'true') {
  refreshToken();
}

app.use('/user', userRouter);

app.get("/visma/customers", (req, res) => {
  getCustomers().then((data) => res.json(data));
});

app.get('/employee', async (req, res) => {
  const employees = await getEmployees();
  res.json(employees);
})

app.get('/project-list', async (req, res) => {
  if (!req["isAdmin"]) {
    res.send(401).end();
  }
  else {
    const projects = await getProjects();
    res.json(projects);
  }
});

app.get('/:email/project-list', async (req, res) => {

  const email = req.params.email;

  const projects = await getProjects(email);
  res.json(projects);
})

app.get('/user/:email/description', async (req, res) => {
  if (!req["isAdmin"]) {
    res.send(401).end();
  } else {
    const response: any = await getDescriptionsByEmail(req.params.email);
    res.json(response.map((transaction: any) => transaction.description));
  }
});

app.get('/project/:id/timereport', (req, res) => {
  if (!req["isAdmin"]) {
    res.send(401).end();
  }
  else {
    let filter: any = {
      project: req.params.id
    }
    if (req.query.year) {
      filter.year = req.query.year;
    }
    if (req.query.month) {
      filter.month = req.query.month;
    }
    getTimeReport(filter).then((timereport) => res.json(timereport));
  }
});

app.post("/timereport", async (req, res) => {
  if (req.body.email != req["user"] && !req["isAdmin"]) {
    res.sendStatus(401).end();
  } else {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newTimeReport = await addTimeReport({
      email: req.body.email,
      time: req.body.time,
      description: req.body.description,
      hours: req.body.hours,
      project_id: req.body.project_id
    }) as TimeReport;

    // TODO - Snygga till denna kodsnutt - bryt ut i egen map-metod i egen fil?.
    // OBS! Förut skickades array med data, nu skickas endast ett objekt. Tänk på ifall vi vill kunna spara flera timrapporter senare..
    const mapTimeReportData = { ...newTimeReport[0], hours: Number(newTimeReport[0].hours) };
    delete mapTimeReportData.created_at;
    res.json(mapTimeReportData);
  }
});


//DOING: gör liknande checkar som vid delete
app.put("/:email/timereport/:id", async (req, res) => {

  if (req.body.email != req["user"] && !req["isAdmin"]) {
    res.sendStatus(401).end();
  } else {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updatedTimeReport = await updateTimeReport({
      email: req.body.email,
      time: req.body.time,
      hours: req.body.hours,
      description: req.body.description,
      project_id: req.body.project_id,
      id: req.body.id
    });

    res.json(updatedTimeReport);
  }
});

app.delete("/:email/timereport/:timeReportId", async (req, res) => {
  if (req.params.email != req["user"] && !req["isAdmin"]) {
    res.sendStatus(401).end();
    console.log("Loggar params", req.params);
  } else {

    const timeReportId = Number(req.params.timeReportId);
    console.log(timeReportId);

    if (!Number.isInteger(timeReportId)) {
      return res.sendStatus(400);
    } else {
      const timeReport = await getTimeReportById(Number(timeReportId));
      if (!timeReport) {
        res.sendStatus(404);
      } else {
        await deleteTimeReportById(timeReportId);
        res.json(timeReport);
      }
    }
    res.json();
  }
});

//CRUD transaction
app.get("/transaction", (req, res) => {
  let filter: any = {
    email: req["user"],
  };

  if (req.query.user) {
    console.log(req["user"]);
  }
  if (req.query.year) {
    filter.year = req.query.year;
  }
  if (req.query.month) {
    filter.month = req.query.month;
  }
  getTransactions(filter).then((transactions) => res.json(transactions));
});

app.post("/transaction", async (req, res) => {
  if (!req["isAdmin"]) {
    res.sendStatus(401).end();
  } else {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newTransaction = await addTransaction({
      email: req.body.email,
      time: req.body.time,
      amount: req.body.amount,
      description: req.body.description,
    });

    res.json(newTransaction[0]);
  }
});

app.delete("/transaction/:transactionId", async (req, res) => {
  if (!req["isAdmin"]) {
    res.sendStatus(401).end();
  } else {

    const transactionId = Number(req.params.transactionId);
    console.log(transactionId);

    if (!Number.isInteger(transactionId)) {
      return res.sendStatus(400);
    } else {
      const transaction = await getTransactionById(Number(transactionId));
      if (!transaction) {
        res.sendStatus(404);
      } else {
        await deleteTransactionById(transactionId);
        res.json(transaction);
      }
    }



    // TODO: const transaction = getTransactionById()

    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    // const newTransaction = await addTransaction({
    //   email: req.body.email,
    //   time: req.body.time,
    //   amount: req.body.amount,
    //   description: req.body.description,
    // });

    res.json();
  }
});

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});