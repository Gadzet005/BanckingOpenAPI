export enum MessageType {
    danger = "danger",
    success = "success",
    warning = "warning",
    info = "info",
    primary = "primary",
    secondary = "secondary",
}

export interface MessageInfo {
    text: string;
    type?: MessageType;
}
