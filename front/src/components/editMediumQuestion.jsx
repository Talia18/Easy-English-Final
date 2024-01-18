import Input from "./common/input";
import PageHeader from "./common/pageHeader";
import { useFormik } from "formik";
import Joi from "joi";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { GREY } from ".";
import { editQuestion } from "../services/usersService";
import Select from "./common/select";
import formikValidateWithJoiMedium from "../utils/formikValidateWithJoiMedium";
import { useSiteContext } from "../context/siteContext";

const EditMediumQuestion = ({ redirect = "/" }) => {
  const [error, setError] = useState("");

  const { allQuestions } = useSiteContext();

  const navigate = useNavigate();
  const { id } = useParams();

  const currentQuestion = allQuestions.filter(
    (question) => question._id === id
  )[0];

  const schema = {
    question: Joi.string().min(2).max(1024).required().label("Question title"),
    option1Title: Joi.string()
      .min(2)
      .max(1024)
      .required()
      .label("Option 1 title"),
    option1Correct: Joi.string()
      .valid("true", "false")
      .required()
      .label("Option 1 Correct Status"),
    option2Title: Joi.string()
      .min(2)
      .max(1024)
      .required()
      .label("Option 2 title"),
    option2Correct: Joi.string()
      .valid("true", "false")
      .required()
      .label("Option 2 Correct Status"),
    option3Title: Joi.string()
      .min(2)
      .max(1024)
      .required()
      .label("Option 3 title"),
    option3Correct: Joi.string()
      .valid("true", "false")
      .required()
      .label("Option 3 Correct Status"),
    option4Title: Joi.string()
      .min(2)
      .max(1024)
      .required()
      .label("Option 4 title"),
    option4Correct: Joi.string()
      .valid("true", "false")
      .required()
      .label("Option 4 Correct Status"),
    tags: Joi.string().min(2).max(1024).required().label("Tags"),
  };

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      question: currentQuestion.question,
      option1Title: currentQuestion.options[0].title,
      option1Correct: currentQuestion.options[0].correct,
      option2Title: currentQuestion.options[1].title,
      option2Correct: currentQuestion.options[1].correct,
      option3Title: currentQuestion.options[2].title,
      option3Correct: currentQuestion.options[2].correct,
      option4Title: currentQuestion.options[3].title,
      option4Correct: currentQuestion.options[3].correct,
      tags: currentQuestion.tags,
    },

    validate: formikValidateWithJoiMedium(schema),

    async onSubmit(values) {
      try {
        const editQ = {
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
            {
              number: 3,
              title: values.option3Title,
              correct: values.option3Correct === "true" ? true : false,
            },
            {
              number: 4,
              title: values.option4Title,
              correct: values.option4Correct === "true" ? true : false,
            },
          ],
          levelNumber: 1,
          levelDescription: "Medium",
          tags: values.tags,
        };
        await editQuestion(id, editQ);
        toast("The question has been updated 👏🏾");
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
          description="Here you can create a new Medium Question"
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
              {...form.getFieldProps("option3Title")}
              type="text"
              label="Option 3 title"
              required
              placeholder="Option 3 Title"
              error={form.touched.option3Title && form.errors.option3Title}
            />
          </div>

          <div className="form-outline mb-3">
            <Select
              {...form.getFieldProps("option3Correct")}
              label="Option 3 Correct Status"
              required
              error={form.touched.option3Correct && form.errors.option3Correct}
            />
          </div>

          <div className="form-outline mb-3">
            <Input
              {...form.getFieldProps("option4Title")}
              type="text"
              label="Option 4 title"
              required
              placeholder="Option 4 Title"
              error={form.touched.option4Title && form.errors.option4Title}
            />
          </div>

          <div className="form-outline mb-3">
            <Select
              {...form.getFieldProps("option4Correct")}
              label="Option 4 Correct Status"
              required
              error={form.touched.option4Correct && form.errors.option4Correct}
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
          <p style={{ backgroundColor: "red", color: "black" }}>
            {!form.isValid &&
              "Please check that all the required fields have a value, and that only 1 correct option is selected.."}
          </p>
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

export default EditMediumQuestion;
