import { FC } from "react";
import { MessageInfo, MessageType } from "./interfaces";

export const Message: FC<MessageInfo> = ({ text, type = MessageType.info }) => {
  return (
    <div>
      <p className={"text-" + type}>{text}</p>
    </div>
  );
};
