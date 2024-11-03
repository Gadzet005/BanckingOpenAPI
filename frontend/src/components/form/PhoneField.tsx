import { FC } from "react";
import { InputProps } from "./props";

const PhoneField: FC<InputProps> = ({
  name = "phone_number",
  label = "Телефон",
  required = true,
}) => {
  return (
    <div className="w-100">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type="tel"
        name={name}
        autoComplete="tel"
        className="form-control"
        id={name}
        placeholder="+79179852425"
        required={required}
      />
    </div>
  );
};

export default PhoneField;
