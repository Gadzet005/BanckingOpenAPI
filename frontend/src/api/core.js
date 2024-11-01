import axios from "axios";

export const backend = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
});

export const authBackend = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
});

const authInterceptor = (config) => {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
        console.warn("Access token not found in local storage");
        return config;
    }
    config.headers.authorization = `Bearer ${access_token}`;
    return config;
};

const authErrorHandler = async (error) => {
    return Promise.reject(error);
};

authBackend.interceptors.request.use(authInterceptor);
authBackend.interceptors.response.use(
    (response) => response,
    (error) => authErrorHandler(error),
);
