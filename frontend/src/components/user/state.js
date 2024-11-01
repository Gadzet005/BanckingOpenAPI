import { action, computed, makeObservable, observable } from "mobx";
import { FormError } from "../form/FormItems";

export class ErrorState {
    messages = [];
    error_id = 0;

    constructor() {
        makeObservable(this, {
            messages: observable,
            view: computed,
            addMessages: action,
            clearMessages: action,
        });
    }

    addMessages(...messages) {
        this.messages.push(...messages);
    }

    clearMessages() {
        this.messages = [];
    }

    get view() {
        return this.messages.map((message) => {
            this.error_id++;
            return <FormError key={this.error_id} message={message} />;
        });
    }
}
