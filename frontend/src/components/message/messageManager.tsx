import { action, computed, makeObservable, observable } from "mobx";
import { Message } from "./Message";
import { MessageInfo, MessageType } from "./interfaces";

export class MessageManager {
  messages: Array<MessageInfo> = [];
  error_id = 0;

  constructor() {
    makeObservable(this, {
      messages: observable,
      view: computed,
      addMessage: action,
      clearMessages: action,
    });
  }

  addMessage(message: MessageInfo) {
    this.messages.push(message);
  }

  addError(message: string) {
    this.addMessage({ text: message, type: MessageType.danger });
  }

  addSuccess(message: string) {
    this.addMessage({ text: message, type: MessageType.success });
  }

  addWarning(message: string) {
    this.addMessage({ text: message, type: MessageType.warning });
  }

  addInfo(message: string) {
    this.addMessage({ text: message, type: MessageType.info });
  }

  addPrimary(message: string) {
    this.addMessage({ text: message, type: MessageType.primary });
  }

  clearMessages() {
    this.messages = [];
  }

  get view() {
    return this.messages.map((message) => {
      this.error_id++;
      return (
        <Message key={this.error_id} text={message.text} type={message.type} />
      );
    });
  }
}
