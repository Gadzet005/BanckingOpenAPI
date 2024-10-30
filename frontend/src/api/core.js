import axios from "axios";

export const backend = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
});
