import { TransactionStore } from "../store/transactionStore";

export interface ChartProps {
    store: TransactionStore;
    useLinearRegression?: boolean;
}
