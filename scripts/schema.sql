    CREATE TABLE IF NOT EXISTS public.employees
    (
        id serial NOT NULL,
        email text COLLATE pg_catalog."default",
        firstname text COLLATE pg_catalog."default",
        lastname text COLLATE pg_catalog."default",
        fullname text COLLATE pg_catalog."default",
        CONSTRAINT employees_pkey PRIMARY KEY (id)
    )
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;

    CREATE TABLE IF NOT EXISTS public.projects
    (
        id serial NOT NULL,
        customer_name text COLLATE pg_catalog."default",
        project_name text COLLATE pg_catalog."default",
        agreement_ref text COLLATE pg_catalog."default",
        active boolean,
        created_at timestamp with time zone,
        CONSTRAINT projects_pkey PRIMARY KEY (id)
    )
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;


    CREATE TABLE IF NOT EXISTS public.project_employee
    (
        project_id integer NOT NULL,
        employee_id integer NOT NULL,
        CONSTRAINT project_employee_pkey PRIMARY KEY (project_id, employee_id)
    )
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;


    CREATE TABLE IF NOT EXISTS public.settings
    (
        id serial NOT NULL,
        key character varying COLLATE pg_catalog."default",
        value character varying COLLATE pg_catalog."default",
        CONSTRAINT settings_pkey PRIMARY KEY (id),
        CONSTRAINT settings_key_key UNIQUE (key)
    )
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;


    CREATE TABLE IF NOT EXISTS public.time_reports
    (
        id serial NOT NULL,
        email text COLLATE pg_catalog."default",
        "time" timestamp without time zone,
        hours numeric,
        description text COLLATE pg_catalog."default",
        created_at timestamp with time zone,
        project_id integer,
        CONSTRAINT time_reports_pkey PRIMARY KEY (id)
    )
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;


    CREATE TABLE IF NOT EXISTS public.transactions
    (
        id serial NOT NULL,
        email text COLLATE pg_catalog."default",
        "time" timestamp without time zone,
        amount numeric,
        description text COLLATE pg_catalog."default",
        created_at timestamp with time zone DEFAULT now(),
        status integer NOT NULL,
        source_reference character varying COLLATE pg_catalog."default",
        CONSTRAINT transactions_pkey PRIMARY KEY (id)
    )
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;