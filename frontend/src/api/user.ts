import { backend } from "./core";

interface Result {
    ok: boolean;
    message?: string;
}

interface LoginResult extends Result {}

interface RegisterResult extends Result {
    emailMessages?: string[];
    phoneNumberMessages?: string[];
    passwordMessages?: string[];
}

export const login = async (
    email: string,
    password: string,
): Promise<LoginResult> => {
    try {
        const response = await backend.post("/login/", {
            email: email,
            password: password,
        });

        const access_token = response.data["access"];
        const refresh_token = response.data["refresh"];
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);

        return { ok: true };
    } catch (error: any) {
        if (error.status === 400) {
            return {
                ok: false,
                message: "Логин или пароль указаны неверно.",
            };
        } else {
            return {
                ok: false,
                message: "Неизвестная ошибка.",
            };
        }
    }
};

export const register = async (
    email: string,
    phone_number: string,
    password: string,
): Promise<RegisterResult> => {
    try {
        const response = await backend.post("/register/", {
            email: email,
            phone_number: phone_number,
            password: password,
        });

        const access_token = response.data["access"];
        const refresh_token = response.data["refresh"];
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);

        return { ok: true };
    } catch (error: any) {
        if (error.status === 400) {
            return {
                ok: false,
                emailMessages: error.response.data["email"],
                phoneNumberMessages: error.response.data["phone_number"],
                passwordMessages: error.response.data["password"],
            };
        } else {
            return {
                ok: false,
                message: "Неизвестная ошибка.",
            };
        }
    }
};
