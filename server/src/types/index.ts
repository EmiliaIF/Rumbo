export type Transaction = {
  id?: number,
  email: string;
  time: Date;
  amount: number;
  description: string;
  sum?: number;
  sourceReference?: string;
  status?: TransactionStatus;
};

export enum TransactionStatus {
  Final,
  Preliminary,
  Rejected
}

// TODO Lägg till TimeReport även här i guess? :)
export type TimeReport = {
  id?: number,
  email: string;
  time: Date;
  description: string;
  hours: number;
  project_id: number;
}

//TODO: Behövs inte type project på server-sidan?