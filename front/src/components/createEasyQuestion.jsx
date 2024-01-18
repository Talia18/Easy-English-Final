import Input from "./common/input";
import PageHeader from "./common/pageHeader";
import { useFormik } from "formik";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import formikValidateWithJoi from "../utils/formikValidateWithJoi";
import { GREY } from ".";
import { createQuestion } from "../services/usersService";
import Select from "./common/select";

const CreateEasyQuestion = ({ redirect = "/" }) => {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const schema = {
    question: Joi.string().min(2).max(1024).required().label("Question title"),
    option1Title: Joi.string()
      .min(2)
      .max(1024)
      .required()
      .label("Option 1 title"),
    option1Correct: Joi.alternatives()
      .conditional("option2Correct", {
        is: "true",
        then: Joi.string().required().valid("false"),
        otherwise: Joi.string().required().valid("true"),
      })
      .label("Option 1 Correct Status"),
    option2Title: Joi.string()
      .min(2)
      .max(1024)
      .required()
      .label("Option 2 title"),
    option2Correct: Joi.alternatives()
      .conditional("option1Correct", {
        is: "true",
        then: Joi.string().required().valid("false"),
        otherwise: Joi.string().required().valid("true"),
      })
      .label("Option 2 Correct Status"),
    tags: Joi.string().min(2).max(1024).required().label("Tags"),
  };

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      question: "",
      option1Title: "",
      option1Correct: "false",
      option2Title: "",
      option2Correct: "false",
      tags: "",
    },

    validate: formikValidateWithJoi(schema),

    async onSubmit(values) {
      try {
        const newQ = {
          question: values.question,
          options: [
            {
              number: 1,
              title: values.option1Title,
              correct: values.option1Correct === "true" ? true : false,
            },
            {
              number: 2,
              title: values.option2Title,
              correct: values.option2Correct === "true" ? true : false,
            },
          ],
          levelNumber: 1,
          levelDescription: "Easy",
          tags: values.tags,
        };
        await createQuestion(newQ);
        toast("A new Question was Created 👏🏾");
        navigate(redirect);
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
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
          title="Create a new Question"
          description="Here you can create a new Easy Question"
        />
        <form onSubmit={form.handleSubmit} noValidate>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="form-outline mb-3">
            <Input
              {...form.getFieldProps("question")}
              type="text"
              label="Question Title"
              required
              placeholder="Question Title"
              error={form.touched.question && form.errors.question}
            />
          </div>

          <div className="form-outline mb-3">
            <Input
              {...form.getFieldProps("option1Title")}
              type="text"
              label="Option 1 title"
              required
              placeholder="option 1 Title"
              error={form.touched.option1Title && form.errors.option1Title}
            />
          </div>

          <div className="form-outline mb-3">
            <Select
              {...form.getFieldProps("option1Correct")}
              label="Option 1 Correct Status"
              required
              error={form.touched.option1Correct && form.errors.option1Correct}
            />
          </div>

          <div className="form-outline mb-3">
            <Input
              {...form.getFieldProps("option2Title")}
              type="text"
              label="Option 2 title"
              required
              placeholder="Option 2 Title"
              error={form.touched.option2Title && form.errors.option2Title}
            />
          </div>

          <div className="form-outline mb-3">
            <Select
              {...form.getFieldProps("option2Correct")}
              label="Option 2 Correct Status"
              required
              error={form.touched.option2Correct && form.errors.option2Correct}
            />
          </div>

          <div className="form-outline mb-3">
            <Input
              {...form.getFieldProps("tags")}
              type="text"
              label="Tags"
              required
              placeholder="Related expressions"
              error={form.touched.tags && form.errors.tags}
            />
          </div>

          <div className="d-flex justify-content-center">
            <button
              disabled={!form.isValid}
              type="submit"
              className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
            >
              Create Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEasyQuestion;
