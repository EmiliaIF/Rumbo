import { Pool, PoolConfig } from "pg";
import { Schema, model, connect } from "mongoose";

export const pool = new Pool({
  ssl: false,
});

export const query = (query, values = null) => {
  return new Promise((resolutionFunc, rejectionFunc) => {
    pool.query({ text: query, values }, (err, res) => {
      if (err) {
        rejectionFunc(err);
      } else {
        resolutionFunc(res.rows);
      }
    });
  });
};

connect("mongodb://localhost:27017");
