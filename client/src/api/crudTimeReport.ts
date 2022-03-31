
import { TimeReport } from "../types";

export const getTimeReportsByUser = (jwtToken: string, email: string, year?: number, month?: number) => {
    let queries = [];
    if (year) {
        queries.push(`year=${year}`);
    }
    if (month) {
        queries.push(`month=${month}`);
    }
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/user/${email}/timereport${queries.length ? "?" + queries.join("&") : ""}`, { headers: { authorization: `bearer ${jwtToken}` },
    }).then((res: any) => res.json());
};

export const getTimeReportsByProject = (jwtToken: string, id: number, year?: number, month?: number) => {

    let queries = [];
    if (year) {
        queries.push(`year=${year}`);
    }
    if (month) {
        queries.push(`month=${month}`);
    }
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/project/${id}/timereport${queries.length ? "?" + queries.join("&") : ""}`, {
        headers: { authorization: `bearer ${jwtToken}` },
    }).then((res: any) => res.json());
};

export const getTimeReportsMeta = (jwtToken: string, email: string) => {
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/user/${email}/timereportmeta`, {
        headers: { authorization: `bearer ${jwtToken}` },
    }).then((res: any) => res.json());
};

export const postTimeReport = (jwtToken: string,
    timeReport: TimeReport) => {
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/timeReport`, {
        method: 'POST',
        body: JSON.stringify(timeReport),
        headers: { authorization: `bearer ${jwtToken}`, 'Content-Type': 'application/json' },
    }).then((res: any) => res.json());
};

export const updateTimeReport = (jwtToken: string, timeReport: TimeReport) => {
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/${timeReport.email}/timereport/${timeReport.id}`, {
        method: 'PUT',
        body: JSON.stringify(timeReport),
        headers: { authorization: `bearer ${jwtToken}`, 'Content-Type': 'application/json' },
    }).then((res: any) => res.json());
};

export const deleteTimeReport = (jwtToken: string, timeReport: TimeReport) => {
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/${timeReport.email}/timereport/${timeReport.id}`, {
        method: 'DELETE',
        headers: { authorization: `bearer ${jwtToken}`, 'Content-Type': 'application/json' },
    }).then((res: any) => res.json());
};