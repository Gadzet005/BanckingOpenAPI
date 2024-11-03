import { FC } from "react";
import { InputProps } from "./props";

const TextField: FC<InputProps> = ({
  name = "text",
  label = "Текст",
  required = true,
}) => {
  return (
    <div className="w-100">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type="name"
        name={name}
        className="form-control"
        placeholder="example"
        id={name}
        required={required}
      />
    </div>
  );
};

export default TextField;
