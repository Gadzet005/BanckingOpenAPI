import { Transfer } from "../../../public/transfer/transfer";

export interface ChartProps {
    list: Transfer[];
}

export interface LineChartProps extends ChartProps {
    useLinearRegression?: boolean;
}
