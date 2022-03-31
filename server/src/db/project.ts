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

    const sqlQuery = `SELECT public.projects.id, public.projects.project_name FROM public.projects
    JOIN public.project_employee on public.projects.id = public.project_employee.project_id
    JOIN public.employees on public.project_employee.employee_id = public.employees.id ${whereClause} GROUP BY public.projects.id, public.projects.project_name`;
    
    return query(sqlQuery, params);
}