const Select = ({ label, name, error, ...rest }) => {
  return (
    <div className="form-group my-1">
      <label htmlFor={name}>
        {label}
        {rest.required && <span className="text-danger ms-1">*</span>}
      </label>
      <select
        {...rest}
        id={name}
        name={name}
        className={["form-control", error && "is-invalid"]
          .filter(Boolean)
          .join(" ")}
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <span className="invalid-feedback">{error}</span>
    </div>
  );
};

export default Select;
