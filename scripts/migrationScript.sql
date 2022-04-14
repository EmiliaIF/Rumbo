COPY(
    SELECT row_to_json(projects) FROM (SELECT id, customer_name, project_name, agreement_ref active, created_at FROM projects) as projects
) TO '/tmp/projects.json' WITH (FORMAT text, HEADER false)

COPY(
    SELECT row_to_json(employees) FROM (SELECT email, firstname, lastname, fullname FROM employees) as employees
) TO '/tmp/employees.json' WITH (FORMAT text, HEADER false)

COPY(
    SELECT row_to_json(transactions) FROM (SELECT id, email, time, amount, description, created_at, status, source_reference FROM transactions) as transactions
) TO '/tmp/transactions.json' WITH (FORMAT text, HEADER false)