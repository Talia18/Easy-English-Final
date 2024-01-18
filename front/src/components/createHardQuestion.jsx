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

const CreateHardQuestion = ({ redirect = "/" }) => {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const schema = {
    question: Joi.string().min(2).max(1024).required().label("Question title"),
    correctAnswer: Joi.string()
      .min(2)
      .max(1024)
      .required()
      .label("Correct Answer"),
    tags: Joi.string().min(2).max(1024).required().label("Tags"),
  };

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      question: "",
      correctAnswer: "",
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
              title: values.correctAnswer,
              correct: true,
            },
          ],
          levelNumber: 1,
          levelDescription: "Hard",
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
          description="Here you can create a new Hard Question"
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
              {...form.getFieldProps("correctAnswer")}
              type="text"
              label="Correct answer"
              required
              placeholder="Correct answer"
              error={form.touched.correctAnswer && form.errors.correctAnswer}
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

export default CreateHardQuestion;
