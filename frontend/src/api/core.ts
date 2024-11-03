import axios, { AxiosError } from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export const backend = axios.create({
    baseURL: backendURL,
});

export const authBackend = axios.create({
    baseURL: backendURL,
});

const authInterceptor = (config: any) => {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
        console.warn("Access token not found in local storage");
        return config;
    }
    config.headers.authorization = `Bearer ${access_token}`;
    return config;
};

const authErrorHandler = async (error: AxiosError) => {
    if (error.status === 401) {
        const refresh_token = localStorage.getItem("refresh_token");
        if (!refresh_token) {
            console.warn("Refresh token not found in local storage");
            return Promise.reject(error);
        }

        try {
            const response = await backend.post("/token/refresh/", {
                refresh: refresh_token,
            });
            const access_token = response.data["access"];
            localStorage.setItem("access_token", access_token);

            return authBackend.request(error.config!);
        } catch (refreshError) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            window.location.reload();

            return Promise.reject(error);
        }
    }
    return Promise.reject(error);
};

authBackend.interceptors.request.use(authInterceptor);
authBackend.interceptors.response.use(
    (response) => response,
    (error) => authErrorHandler(error),
);
