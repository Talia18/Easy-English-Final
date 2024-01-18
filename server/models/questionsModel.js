const mongoose = require("mongoose");
const Joi = require("joi");

const questionsSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
    },
    options: [
      {
        number: {
          type: Number,
          min: 1,
          required: true,
        },
        title: {
          type: String,
          minlength: 2,
          maxlength: 255,
          required: true,
        },
        correct: {
          type: Boolean,
          required: true,
        },
      },
    ],
    levelNumber: {
      type: Number,
      required: true,
      min: 1,
    },
    levelDescription: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 11,
    },
    tags: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 100,
    }
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionsSchema, "questions");

function validateQuestion(question) {
  const schema = Joi.object({
    question: Joi.string().min(2).max(255).required(),
    options: Joi.array().items({
      number: Joi.number().min(1).required(),
      title: Joi.string().min(2).max(1024).required(),
      correct: Joi.boolean().required(),
    }).required(),
    levelNumber: Joi.number().min(1).required(),
    levelDescription: Joi.string().valid("Easy", "Medium", "Hard").required(),
    tags: Joi.string().min(4).max(100).required(),
  });

  return schema.validate(question);
}

module.exports = { Question, validateQuestion };
