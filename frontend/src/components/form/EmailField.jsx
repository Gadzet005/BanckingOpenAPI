const EmailField = ({ name = "email", label = "Email", required = true }) => {
  return (
    <div className="w-100">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type="email"
        name={name}
        autoComplete="email"
        className="form-control"
        id={name}
        placeholder="example@email.com"
        required={required}
      />
    </div>
  );
};

export default EmailField;
