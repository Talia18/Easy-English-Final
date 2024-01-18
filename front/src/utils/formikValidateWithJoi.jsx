import Joi from "joi";

const formikValidateWithJoi = (formValidationSchema) => {
  return function validate(values) {
    // if no error return null
    // if errors return {email:"error masssage", name:"error masssage"}
    const schema = Joi.object(formValidationSchema);

    const { error } = schema.validate(values, { abortEarly: false });

    if (!error) {
      return null;
    }

    const errors = {};
    for (const detail of error.details) {
      const errorKey = detail.path[0];
      errors[errorKey] = detail.message;
    }

    return errors;
  };
};

export default formikValidateWithJoi;
