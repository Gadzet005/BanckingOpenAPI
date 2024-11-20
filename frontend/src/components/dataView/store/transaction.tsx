import { Avatar } from "@mui/material";
import {
  ITransaction,
  TransactionCategory,
  TransactionType,
} from "../../../public/transaction";
import { formatDate } from "../../../public/utils";
import { categoryInfo } from "./category";

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

  getCategory(): string {
    let category: string = this.category;
    if (category === "transfer") {
      category = this.type === "income" ? "transferIn" : "transferOut";
    }
    return category;
  }

  getCategoryInfo() {
    return categoryInfo[this.getCategory()];
  }

  get formattedCategory(): string {
    return this.getCategoryInfo().name;
  }

  get categoryIcon() {
    const info = this.getCategoryInfo();
    return (
      <Avatar sx={{ bgcolor: info.color, width: 32, height: 32 }}>
        {info.icon}
      </Avatar>
    );
  }
}
