import { createContext, useContext } from "react";
import { makeObservable, observable, action } from "mobx";
import { jwtDecode } from "jwt-decode";

type UserJWTPayload = {
    user_id: number;
    email: string;
    phone_number: string;
};

export class User {
    isAuth: boolean = false;
    id?: number;
    email?: string;
    phoneNumber?: string;

    constructor() {
        makeObservable(this, {
            isAuth: observable,
            email: observable,
            phoneNumber: observable,
            login: action,
            logout: action,
        });
    }

    login(id: number, email: string, phoneNumber: string) {
        this.isAuth = true;
        this.id = id;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    logout() {
        this.isAuth = false;
        this.id = undefined;
        this.email = undefined;
        this.phoneNumber = undefined;

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
    }

    tryLogin() {
        if (this.isAuth) {
            return;
        }

        const token = localStorage.getItem("access_token");
        if (!token) {
            return;
        }

        try {
            const decoded = jwtDecode<UserJWTPayload>(token);
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

const defaultUser = new User();
export const UserContext = createContext<User>(defaultUser);
export const useGetUser = () => useContext(UserContext);
