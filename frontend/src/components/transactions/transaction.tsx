import {
  ITransaction,
  TransactionType,
  TransactionCategory,
} from "../../public/transaction";
import { categoryInfo } from "./category";
import { Avatar } from "@mui/material";
import { formatDate } from "./utils";

export class Transaction implements Transaction {
  id: number;
  amount: number;
  date: Date;
  account_code: number;
  bank_name: string;
  bank_code: number;
  type: TransactionType;
  category: TransactionCategory;

  constructor(transaction: ITransaction) {
    this.id = transaction.id;
    this.amount = transaction.amount;
    this.date = transaction.date;
    this.account_code = transaction.account_code;
    this.bank_name = transaction.bank_name;
    this.bank_code = transaction.bank_code;
    this.type = transaction.type;
    this.category = transaction.category;
  }

  get formattedDate(): string {
    return formatDate(this.date);
  }

  get formattedAmount(): string {
    const sign = this.type == "income" ? "+" : "-";
    return `${sign}${this.amount.toFixed(2)} ₽`;
  }

  get formattedCategory(): string {
    return categoryInfo[this.category].name;
  }

  get categoryIcon() {
    const color = categoryInfo[this.category].color;
    const icon = categoryInfo[this.category].icon;
    return (
      <Avatar sx={{ bgcolor: color, width: 32, height: 32 }}>{icon}</Avatar>
    );
  }
}
