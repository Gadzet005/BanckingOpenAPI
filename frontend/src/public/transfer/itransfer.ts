export type TransferType = "income" | "expense";
export type TransferCategory =
    | "salary"
    | "gift"
    | "investment"
    | "transfer"
    | "entertainment"
    | "food"
    | "transport"
    | "utilities"
    | "other";

export interface ITransfer {
    id: number;
    amount: number;
    date: Date;
    account_code: number;
    bank_name: string;
    bank_code: number;
    type: TransferType;
    category: TransferCategory;
}
