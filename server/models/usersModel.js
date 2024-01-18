const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
    },
    phone: {
      type: String,
      required: true,
      minlength: 9,
      maxlength: 10,
    },
    email: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 100,
    },
    image: {
      url: {
        type: String,
        default:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        minlength: 0,
        maxlength: 1024,
      },
      alt: {
        type: String,
        minlength: 0,
        maxlength: 255,
        default: "User Image",
      },
    },
    address: {
      country: {
        type: String,
        minlength: 0,
        maxlength: 255,
        default: "",
      },
      city: {
        type: String,
        minlength: 0,
        maxlength: 255,
        default: "",
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    score: {
      type: Number,
      default: 0,
    },
    questions: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
        },
        answer: {
          type: String,
          min: 0,
          required: true,
        },
        correct: {
          type: Boolean,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      isAdmin: this.isAdmin,
    },
    config.get("auth.JWT_SECRET")
  );
};

const User = mongoose.model("User", userSchema, "users");

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    phone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .pattern(/^0[2-9]\d{7,8}$/),
    email: Joi.string().min(6).max(255).required().email({ tlds: false }),
    password: Joi.string().min(6).max(100).required().pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*\d).{6,12}$/),
    image: Joi.object({
      url: Joi.string().min(0).max(1024).optional().allow(null, ""),
      alt: Joi.string().min(0).max(255).optional().allow(null, ""),
    }),
    address: Joi.object({
      country: Joi.string().min(0).max(255).optional().allow(null, ""),
      city: Joi.string().min(0).max(255).optional().allow(null, ""),
    }),
  });

  return schema.validate(user);
}

module.exports = { User, validateUser };
