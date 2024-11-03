import axios from "axios";

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

const authErrorHandler = async (error: any) => {
    return Promise.reject(error);
};

authBackend.interceptors.request.use(authInterceptor);
authBackend.interceptors.response.use(
    (response) => response,
    (error) => authErrorHandler(error),
);
