import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import PageHeader from "./common/pageHeader";
import Input from "./common/input";
import { useFormik } from "formik";
import formikValidateWithJoi from "../utils/formikValidateWithJoi";
import Joi from "joi";
import { useSiteContext } from "../context/siteContext";
import { GREY } from ".";

const SignUp = () => {
  const [error, setError] = useState("");

  const { signUp, login } = useSiteContext();

  const navigate = useNavigate();

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@%$#^&*\-_])(?=(.*\d){4,})[a-zA-Z!@%$#^&*\-_\d]{8,}$/;

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      imageUrl: "",
      country: "",
      city: "",
    },
    validate: formikValidateWithJoi({
      name: Joi.string().min(2).max(100).required().label("Name"),
      email: Joi.string()
        .min(6)
        .max(225)
        .required()
        .email({ tlds: { allow: false } })
        .label("Email"),
      password: Joi.string()
        .min(6)
        .max(225)
        .required()
        .regex(passwordRegex)
        .label("Password")
        .messages({
          "string.pattern.base": `The "Password" must contain at least 8 Characters, and include 1 Upper-Case letter, 1 Lower-Case letter, 1 Special Symbol(!@%$#^&*-_) and 4 digits(0-9).`,
        }),
      phone: Joi.string()
        .min(9)
        .max(10)
        .required()
        .pattern(/^0[2-9]\d{7,8}$/),
      imageUrl: Joi.string().min(11).max(1024).optional().allow(null, ""),
      country: Joi.string()
        .min(3)
        .max(255)
        .label("Country")
        .allow(null, "")
        .optional(),
      city: Joi.string()
        .min(2)
        .max(255)
        .label("City")
        .allow(null, "")
        .optional(),
    }),
    async onSubmit(values) {
      try {
        await signUp({
          name: values.name,
          email: values.email,
          password: values.password,
          phone: values.phone,
          image: { url: values.imageUrl, alt: values.name },
          address: { country: values.country, city: values.city },
        });
        await login({ email: values.email, password: values.password });
        navigate("/");
      } catch ({ response }) {
        if (response && response.status === 400) setError(response.data);
      }
    },
  });

  return (
    <div className="row d-flex justify-content-center align-items-center h-100 my-4">
      <div
        style={{ backgroundColor: GREY }}
        className="col-12 col-md-6 col-lg-6 col-xl-4 border rounded px-3 pb-3"
      >
        <PageHeader
          title={
            <>
              Sign Up to EasyEnglish
              <span style={{ fontSize: "20px", verticalAlign: "super" }}>
                ©
              </span>
            </>
          }
          description=""
        />

        <form onSubmit={form.handleSubmit} noValidate>
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="form-outline mb-3">
            <Input
              {...form.getFieldProps("name")}
              type="name"
              label="Name"
              required
              placeholder="name"
              error={form.touched.name && form.errors.name}
            />
          </div>

          <div className="form-outline mb-3">
            <Input
              {...form.getFieldProps("email")}
              type="email"
              label="Email"
              required
              placeholder="email"
              error={form.touched.email && form.errors.email}
            />
          </div>

          <div className="form-outline mb-3">
            <Input
              {...form.getFieldProps("password")}
              type="password"
              label="Password"
              required
              placeholder="password"
              error={form.touched.password && form.errors.password}
            />
          </div>

          <div className="form-outline mb-3">
            <Input
              {...form.getFieldProps("phone")}
              type="tel"
              label="Phone"
              required
              placeholder="phone"
              error={form.touched.phone && form.errors.phone}
            />
          </div>

          <div className="form-outline mb-3">
            <Input
              {...form.getFieldProps("country")}
              type="text"
              label="Country"
              placeholder="country"
              error={form.touched.country && form.errors.country}
            />
          </div>

          <div className="form-outline mb-3">
            <Input
              {...form.getFieldProps("city")}
              type="text"
              label="City"
              placeholder="city"
              error={form.touched.city && form.errors.city}
            />
          </div>

          <div className="form-outline mb-3">
            <Input
              {...form.getFieldProps("imageUrl")}
              type="url"
              label="Image Url"
              placeholder="imageUrl"
              error={form.touched.imageUrl && form.errors.imageUrl}
            />
          </div>

          <div className="d-flex justify-content-center">
            <button
              disabled={!form.isValid}
              type="submit"
              className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
            >
              Sign Up
            </button>
          </div>

          <p className="text-center mt-2 mb-0">
            Have an account?{" "}
            <NavLink to="/sign-in" className="fw-bold">
              Sign In
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
