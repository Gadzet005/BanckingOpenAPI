import { getHelloMessage } from "../../api/helloApi"
import { useState, useEffect } from "react";

export const SomePage = () => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        getHelloMessage().then(
            (message) => setMessage(message),
            () => setMessage("Ошибка при получении сообщения")
        );
    }, [])

    return (
      <div>
        <p>Сообщение с бэкэнда:</p>
        <p>{ message }</p>
      </div>
    );
  };