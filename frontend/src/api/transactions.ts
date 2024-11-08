import { authBackend } from "./core";
import { ITransaction } from "../public/transaction";

export const getTransactions = async (): Promise<ITransaction[]> => {
    try {
        const response = await authBackend.get("/transactions/");
        return response.data.map((transaction: any) => {
            return {
                id: transaction.id,
                amount: transaction.amount,
                account_code: transaction.account_code,
                bank_name: transaction.bank_name,
                bank_code: transaction.bank_code,
                type: transaction.type,
                category: transaction.subtype || "other",
                date: new Date(transaction.date),
            };
        });
    } catch (error) {
        return [];
    }
};
