const TextField = ({ name = "text", label = "Текст" }) => {
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
      />
    </div>
  );
};

export default TextField;
