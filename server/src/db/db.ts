// import { Pool, PoolConfig } from "pg";
import mongoose from "mongoose";
import './models/employee.ts';

export function connectToDatabase(): void {

  const uri = 'mongodb://localhost:27017/rumbo';
  const dbURI = process.env["DB_URL"] || uri;

  mongoose
    .connect(dbURI, {
      serverSelectionTimeoutMS: 5000,
    })
    .catch((err: any) => console.log(err.reason));

  mongoose.connection.on("connected", () => {
    console.log(`Mongoose connected`);
  });
  mongoose.connection.on("error", (err: any) => {
    console.log(`Mongoose connection error: ${err}`);
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected");
  });
}
// export const pool = new Pool({
//   ssl: false,
// });

// export const query = (query, values = null) => {
//   return new Promise((resolutionFunc, rejectionFunc) => {
//     pool.query({ text: query, values }, (err, res) => {
//       if (err) {
//         rejectionFunc(err);
//       } else {
//         resolutionFunc(res.rows);
//       }
//     });
//   });
// };

// connect("mongodb://localhost:27017");
