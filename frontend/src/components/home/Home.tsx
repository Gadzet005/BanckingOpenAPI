import { FC } from "react";
import chartImage from "./imgs/chartImage.png";

export const Home: FC = () => {
  return (
    <div>
      <h1 className="text-center">Добро пожаловать!</h1>
      <div className="d-flex justify-content-center">
        <div className="col-6">
          <p className="fs-5">
            Это финансовый помощник, который может отслеживать все ваши
            банковские переводы в режиме реального времени, а так же
            предоставлять статистику по расходам и доходам.
          </p>
        </div>
      </div>
      <div className="d-flex justify-content-center p-2">
        <img height={500} width={1000} src={chartImage} />
      </div>
    </div>
  );
};
