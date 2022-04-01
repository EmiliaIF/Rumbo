import { query } from "./db";

export const getProjects = async (
    email?: string
) => {
    let whereClause = '';
    let params = [];
    if (email) {
        whereClause = `WHERE public.employees.email = $1`;
        params = [ email ]
    }

    const sqlQuery = `SELECT public.projects.id, public.projects.project_name FROM public.projects`;
    
    return query(sqlQuery, params);
}