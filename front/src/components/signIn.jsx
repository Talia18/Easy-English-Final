import { useState } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import PageHeader from "./common/pageHeader";
import Input from "./common/input";
import { useFormik } from "formik";
import formikValidateWithJoi from "../utils/formikValidateWithJoi";
import { useSiteContext } from "../context/siteContext";
import Joi from "joi";
import { GREY } from ".";

const SignIn = () => {
  const [error, setError] = useState("");

  const { login, user } = useSiteContext();

  const navigate = useNavigate();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate: formikValidateWithJoi({
      email: Joi.string()
        .min(6)
        .max(225)
        .required()
        .email({ tlds: { allow: false } })
        .label("Email"),
      password: Joi.string().min(6).max(225).required().label("Password"),
    }),
    async onSubmit(values) {
      try {
        await login(values);
        navigate("/");
      } catch ({ response, arr }) {
        if (response && response.status === 400) setError(response.data);
      }
    },
  });

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="row d-flex justify-content-center align-items-center h-100 my-4">
      <div
        style={{ backgroundColor: GREY }}
        className="col-12 col-md-6 col-lg-6 col-xl-4 border rounded px-3 pb-3"
      >
        <PageHeader
          title={
            <>
              Sign In to EasyEnglish
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

          <div className="d-flex justify-content-center">
            <button
              disabled={!form.isValid}
              type="submit"
              className="btn btn-success btn-lg gradient-custom-4 text-body"
            >
              Sign In
            </button>
          </div>

          <p className="text-center mt-2 mb-0">
            Need an account?{" "}
            <NavLink to="/sign-up" className="fw-bold">
              Sign Up
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
