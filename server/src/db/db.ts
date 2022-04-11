// import { Pool, PoolConfig } from "pg";
import mongoose from "mongoose" ;
import './models/employee.ts';

const uri = 'mongodb://localhost:27017/rumbo';


  mongoose
    .connect(uri, {
      serverSelectionTimeoutMS: 5000,
    })
    .catch((err: any) => console.log(err.reason));

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
