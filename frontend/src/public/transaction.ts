export type TransactionType = "income" | "expense";
export type TransactionCategory =
    | "salary"
    | "gift"
    | "investment"
    | "transfer"
    | "entertainment"
    | "food"
    | "transport"
    | "utilities"
    | "other";

export interface ITransaction {
    id: number;
    amount: number;
    date: Date;
    account_code: number;
    bank_name: string;
    bank_code: number;
    type: TransactionType;
    category: TransactionCategory;
}
