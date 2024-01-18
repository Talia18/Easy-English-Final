import Joi from "joi";

const formikValidateWithJoiMedium = (formValidationSchema) => {
  return function validate(values) {
    // if no error return null
    // if errors return {email:"error masssage", name:"error masssage"}
    const schema = Joi.object(formValidationSchema).custom((value, helpers) => {
      const fields = [
        "option1Correct",
        "option2Correct",
        "option3Correct",
        "option4Correct",
      ];
      const trueCount = fields.reduce(
        (count, field) => (value[field] === "true" ? count + 1 : count),
        0
      );

      if (trueCount !== 1) {
        return helpers.error("any.invalid");
      }

      return value;
    }, "custom validation");

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

export default formikValidateWithJoiMedium;
