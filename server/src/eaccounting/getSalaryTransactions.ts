import { fetchFromVisma } from "./index";
import { Transaction, TransactionStatus } from "../types";

const getAmountFromVoucherRow = (row: any) => row.DebitAmount > 0 ? row.DebitAmount : -row.CreditAmount;

const mapVoucherRowToTransaction = (voucher: any, row: any): any => {
  return {
    time: new Date(voucher.CreatedUtc),
    amount: getAmountFromVoucherRow(row),
    description: row.description,
    sourceReference: `${voucher.Id}-${row.AccountNumber}`,
    status: TransactionStatus.Preliminary,
  }
}

const mapVoucherToTransactions = (voucher: any): any[] => {
  return voucher.Rows
    .map(row => {
      switch (row.AccountNumber) {
        case 2910:
          return { ...row, description: "Lön" }
          break;
        case 2710:
          return { ...row, description: "Prel. skatt" }
          break;
        case 2731:
          return { ...row, description: "Sociala avgifter" }
          break;
        default:
          return null;
      }
    })
    .filter(row => !!row)
    .map(row => mapVoucherRowToTransaction(voucher, row));
}

export const getSalaryTransactions = async (year: number, month: number, fullName: string) => {
  const response = await fetchFromVisma(`/vouchers?$filter=year(VoucherDate) eq ${year} and month(VoucherDate) eq ${month} and VoucherText eq 'Lönebesked för ${fullName}'`);
  const transactions = response.Data.flatMap(mapVoucherToTransactions);
  return transactions;
}