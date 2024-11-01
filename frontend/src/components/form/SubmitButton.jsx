const SubmitButton = ({ label = "Подтвердить" }) => {
  return (
    <button type="submit" className="btn btn-primary w-100">
      {label}
    </button>
  );
};

export default SubmitButton;
