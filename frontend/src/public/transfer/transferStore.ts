import { action, makeObservable, computed, observable } from "mobx";
import { ITransfer } from "./itransfer";
import { Transfer } from "./transfer";
import { DatePeriod, getStartDateForPeriod } from "./dateUtils";

type TypeFilter = "all" | "expense" | "income";

export class TransferStore {
    all: Transfer[] = [];
    periodFilter: DatePeriod = "all";
    typeFilter: TypeFilter = "all";

    filtered: {
        valid: boolean;
        list: Transfer[];
    } = { valid: false, list: [] };

    constructor(list: ITransfer[]) {
        this.all = list.map((transfer) => new Transfer(transfer));

        makeObservable(this, {
            all: observable,
            periodFilter: observable,
            typeFilter: observable,
            add: action,
            filterByPeriod: action,
            filterByTransferType: action,
            list: computed,
        });
    }

    get list(): Transfer[] {
        if (!this.filtered.valid) {
            const startDate = getStartDateForPeriod(this.periodFilter);
            this.filtered.list = this.all.filter(
                (transfer) =>
                    transfer.date >= startDate &&
                    (this.typeFilter === "all" ||
                        this.typeFilter === transfer.type),
            );
            this.filtered.valid = true;
        }
        return this.filtered.list;
    }

    add(transfer: ITransfer): boolean {
        const newElem = new Transfer(transfer);

        if (
            this.all.length > 0 &&
            this.all[this.all.length - 1].date > newElem.date
        ) {
            console.warn("Try to add outdated transfer.");
            return false;
        }

        this.all.push(newElem);
        this.filtered.valid = false;
        return true;
    }

    filterByPeriod(period: DatePeriod) {
        this.periodFilter = period;
        this.filtered.valid = false;
    }

    filterByTransferType(type: TypeFilter) {
        this.typeFilter = type;
        this.filtered.valid = false;
    }
}
