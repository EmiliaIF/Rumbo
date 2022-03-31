import eaccounting from "eaccounting";
import fetch from "node-fetch";
import { encode } from "js-base64";
import { getSetting, setSetting } from '../db/setting';

//https://identity.vismaonline.com/connect/authorize?client_id=sprintoswedenab&redirect_uri=https://localhost:44300/callback&scope=ea:api%20offline_access%20ea:sales%20ea:accounting&state=abc1232&response_type=code&prompt=login
//https://eaccountingapi.vismaonline.com/v2/vouchers?$filter=year(VoucherDate) eq 2020 and month(VoucherDate) eq 12 and day(VoucherDate) eq 27

export const refreshToken = async () => {
  const refreshToken = await getSetting("VISMA_REFRESH_TOKEN");
  console.log('refreshToken', refreshToken);

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
  console.log('response', response);

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