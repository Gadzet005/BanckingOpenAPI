import { authBackend } from "./core";
import { Transaction } from "../public/transaction";

export const getTransactions = async (): Promise<Transaction[]> => {
    try {
        const response = await authBackend.get("/transactions/");
        return response.data.map((transaction: any) => {
            return {
                ...transaction,
                date: new Date(transaction.date),
            };
        });
    } catch (error) {
        console.log(error);
        return [];
    }
};
