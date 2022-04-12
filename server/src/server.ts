import express from "express";
// // import auth from "./auth";
import dotenv from "dotenv";
// import { refreshToken } from "./eaccounting";
import { getProject } from "./db/projectCrud";
// // import { getDescriptionsByEmail } from "./db/description";

// import userRouter from "./routes/user";
// import transactionRouter from "./routes/transaction";
// import vismaRouter from "./routes/visma";
// import timeReportRouter from "./routes/timeReport";
import employeeRouter from "./routes/employee";
import { connectToDatabase } from "./db/db";

const env = process.env.ENV || "local";
dotenv.config({ path: `config/${env}.env` });
if (env === "local") {
  dotenv.config({ path: `../config/global.${env}.env` });
} else {
  dotenv.config({ path: `config/global.${env}.env` });
}

const app = express();
const port = 4000;
connectToDatabase();

// // app.use(auth);
app.use(express.json());

// //Routers
// app.use("/transaction", transactionRouter);
// app.use("/user", userRouter);
// app.use("/visma", vismaRouter);
// app.use("/time", timeReportRouter);
app.use("/employees", employeeRouter);

// if (process.env.VISMA_IMPORT_FEATURE === "true") {
//   refreshToken();
// }

app.get("/project-list", getProject);


app.get("/:email/project-list", async (req, res) => {
  const email = req.params.email;

  const projects = await getProject;
  res.json(projects);
});

// app.get("/user/:email/description", async (req, res) => {
//   if (req["isAdmin"]) {
//     res.send(401).end();
//   } else {
//     const response: any = await getDescriptionsByEmail(req.params.email);
//     res.json(response.map((transaction: any) => transaction.description));
//   }
// });

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
