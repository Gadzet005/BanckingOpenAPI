const PasswordField = ({
  name = "password",
  label = "Пароль",
  required = true,
}) => {
  return (
    <div className="w-100">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type="password"
        name={name}
        autoComplete="current-password"
        className="form-control"
        id={name}
        required={required}
      />
    </div>
  );
};

export default PasswordField;
