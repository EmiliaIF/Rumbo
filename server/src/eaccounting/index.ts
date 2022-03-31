import eaccounting from "eaccounting";
import fetch from "node-fetch";
import { encode } from "js-base64";
import { getSetting, setSetting } from '../db/setting';

export const refreshToken = async () => {
  const refreshToken = await getSetting("VISMA_REFRESH_TOKEN");

  const response = await fetch(`${process.env.VISMA_AUTH_URI}/connect/token`, {
    method: "post",
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
      Authorization: `Basic ${encode(
        `${process.env.VISMA_CLIENT_ID}:${process.env.VISMA_CLIENT_SECRET}`
      )}`,
    },
    body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
  })
    .then((res) => res.json());

  if (response.refresh_token) {
    await setSetting('VISMA_REFRESH_TOKEN', response.refresh_token);
  }
  if (response.access_token) {
    await setSetting('VISMA_ACCESS_TOKEN', response.access_token);
  }
};

export const fetchFromVisma = async (relativePath: string, method: string = "get") => {
  const accessToken = await getSetting("VISMA_ACCESS_TOKEN");
  const data = await fetch(`${process.env.VISMA_API_URI}${relativePath}`, {
    method,
    headers: { authorization: `Bearer ${accessToken}` },
  }).then((res) => res.json()).then(data => {
    if (data.ErrorCode) {
      console.log("failed to fetch from visma", data);
    }
    return data;
  });

  return data;
};

export const getCustomers = () => fetchFromVisma("/customers?$select=Id,Name");
export const getVouchers = (year: number, month: number, day: number) => fetchFromVisma(`/vouchers?$filter=year(VoucherDate) eq ${year} and month(VoucherDate) eq ${month}`);

export { getSalaryTransactions } from './getSalaryTransactions';