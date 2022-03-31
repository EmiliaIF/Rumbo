import { query } from "./db";

export const getDescriptionsByEmail = async (email: string) => {
    console.log('email-------------', email);
    const sqlQuery = `SELECT DISTINCT description FROM public.transactions WHERE email LIKE $1`;
    return await query(sqlQuery, [ email ]);
};
