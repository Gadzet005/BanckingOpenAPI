import { authBackend } from "./core";
import { BankAccount } from "../public/bankAccount/BankAccount";

export const getBankAccounts = async (): Promise<BankAccount[]> => {
    try {
        const response = await authBackend.get("/accounts/");
        return response.data.map((account: any) => {
            return {
                id: account.id,
                code: account.account_code,
                balance: account.balance,
                bankCode: account.bank_code,
                bankName: account.bank_name,
                isHide: account.isHide,
            };
        });
    } catch (error) {
        return [];
    }
};

export const toggleBankAccountVisibility = async (accountCode: number) => {
    try {
        await authBackend.post(`/changevisibility/${accountCode}/`);
        return true;
    } catch (error) {
        return false;
    }
};
