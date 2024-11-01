import { backend } from "./core";

export const login = async (email, password) => {
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
    } catch (error) {
        if (error.status === 400) {
            return {
                ok: false,
                messages: ["Логин или пароль указаны неверно."],
            };
        } else {
            return {
                ok: false,
                messages: ["Неизвестная ошибка."],
            };
        }
    }
};

export const register = async (email, phone_number, password) => {
    try {
        await backend.post("/register/", {
            email: email,
            phone_number: phone_number,
            password: password,
        });

        return { ok: true };
    } catch (error) {
        if (error.status === 400) {
            return {
                ok: false,
                messages: [
                    ...(error.response.data["email"] || []),
                    ...(error.response.data["phone_number"] || []),
                    ...(error.response.data["password"] || []),
                ],
            };
        } else {
            return {
                ok: false,
                messages: ["Неизвестная ошибка."],
            };
        }
    }
};
