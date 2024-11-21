import { ITransfer } from "./itransfer";

export class TransferWebSocket {
    socket: WebSocket;

    constructor(onMessage: (transfer: ITransfer) => void) {
        const backendURL = import.meta.env.VITE_BACKEND_URL;
        const token = localStorage.getItem("access_token");

        this.socket = new WebSocket(
            `${backendURL}/ws/transactions/?token=${token}`,
        );

        this.socket.onmessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            if (data.event_type === "transaction") {
                const transfer: ITransfer = {
                    id: data.id,
                    amount: data.amount,
                    account_code: data.account_code,
                    bank_name: data.bank_name,
                    bank_code: data.bank_code,
                    type: data.type,
                    category: data.subtype || "other",
                    date: new Date(data.date),
                };
                onMessage(transfer);
            }
        };
    }

    close() {
        if (this.socket.readyState) {
            this.socket.close();
        } else {
            this.socket.onopen = () => {
                this.socket.close();
            };
        }
    }
}
