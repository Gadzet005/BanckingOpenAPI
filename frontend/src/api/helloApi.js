import { backend } from "./core";

export const getHelloMessage = async () => {
    const { data } = await backend.get("/hello");
    return data["message"];
};
