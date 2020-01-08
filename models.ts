export enum Denomination {
  "HUNDRED" = 100,
  "TWO_HUNDRED" = 200,
  "FIVE_HUNDRED" = 500,
  "TWO_THOUSAND" = 2000
}

export type TransactionType = "deposit" | "withdrawal";

export type Notes = { [key: number]: number };

export interface ITransaction {
  type: TransactionType;
  amount: number;
  balance: number;
}
