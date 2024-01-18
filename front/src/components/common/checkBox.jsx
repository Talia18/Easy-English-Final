const Checkbox = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-check my-1">
      <input
        {...rest}
        type="checkbox"
        id={name}
        name={name}
        className={["form-check-input", error && "is-invalid"]
          .filter(Boolean)
          .join(" ")}
      />
      <label htmlFor={name} className="form-check-label">
        {label}
        {rest.required && <span className="text-danger ms-1">*</span>}
      </label>
      <span className="invalid-feedback">{error}</span>
    </div>
  );
};

export default Checkbox;
