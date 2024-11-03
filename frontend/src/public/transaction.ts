type TransactionType = "income" | "expense";

export interface Transaction {
    id: number;
    amount: number;
    date: Date;
    description: string;
    account_code: number;
    bank_name: string;
    bank_code: number;
    type: TransactionType;
}
