import { authBackend } from "./core";
import { ITransfer } from "../public/transfer/itransfer";

export const getTransfers = async (): Promise<ITransfer[]> => {
    try {
        const response = await authBackend.get("/transactions/");
        return response.data.map((transfer: any) => {
            return {
                id: transfer.id,
                amount: transfer.amount,
                account_code: transfer.account_code,
                bank_name: transfer.bank_name,
                bank_code: transfer.bank_code,
                type: transfer.type,
                category: transfer.subtype || "other",
                date: new Date(transfer.date),
            };
        });
    } catch (error) {
        return [];
    }
};
