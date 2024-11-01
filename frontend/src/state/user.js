import { makeObservable, observable, action } from "mobx";
import { jwtDecode } from "jwt-decode";

export class User {
    isAuth = false;
    id = null;
    email = null;
    phoneNumber = null;

    constructor() {
        makeObservable(this, {
            isAuth: observable,
            email: observable,
            phoneNumber: observable,
            login: action,
            logout: action,
        });
    }

    login(id, email, phoneNumber) {
        this.isAuth = true;
        this.id = id;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    logout() {
        this.isAuth = false;
        this.id = null;
        this.name = null;
        this.email = null;
        this.phoneNumber = null;

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
    }

    tryLogin() {
        if (this.isAuth) {
            return;
        }

        const token = localStorage.getItem("access_token");
        try {
            const decoded = jwtDecode(token);
            this.login(
                decoded["user_id"],
                decoded["email"],
                decoded["phone_number"],
            );
        } catch {
            if (this.isAuth) {
                this.logout();
            }
        }
    }
}
