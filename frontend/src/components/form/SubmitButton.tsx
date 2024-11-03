import { FC } from "react";

interface Props {
  label?: string;
}

const SubmitButton: FC<Props> = ({ label = "Подтвердить" }) => {
  return (
    <button type="submit" className="btn btn-primary w-100">
      {label}
    </button>
  );
};

export default SubmitButton;
