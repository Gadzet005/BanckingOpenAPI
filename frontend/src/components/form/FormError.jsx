const FormError = ({ message }) => {
  return (
    <div>
      <p className="text-danger">{message}</p>
    </div>
  );
};

export default FormError;
