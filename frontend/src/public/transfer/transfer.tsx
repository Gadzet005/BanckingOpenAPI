import { Avatar } from "@mui/material";
import { ITransfer, TransferCategory, TransferType } from "./itransfer";
import { formatDate } from "./dateUtils";
import { categoryInfo } from "./categoryInfo";

export class Transfer implements ITransfer {
  id: number;
  amount: number;
  date: Date;
  account_code: number;
  bank_name: string;
  bank_code: number;
  type: TransferType;
  category: TransferCategory;

  constructor(transfer: ITransfer) {
    this.id = transfer.id;
    this.amount = transfer.amount;
    this.date = transfer.date;
    this.account_code = transfer.account_code;
    this.bank_name = transfer.bank_name;
    this.bank_code = transfer.bank_code;
    this.type = transfer.type;
    this.category = transfer.category;
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
