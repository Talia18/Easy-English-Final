const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const Joi = require("joi");
const { User, validateUser } = require("../models/usersModel");
const authMW = require("../middleware/authMW");

// Create New User / Register / Sign up
usersRouter.post("/", async (req, res) => {
  //validate user input
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).json(error.details[0].message);
    return;
  }
  //validate system
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(400).send("User already registered");
    return;
  }
  //process
  user = new User(req.body);
  user.password = await bcrypt.hash(user.password, 12);

  await user.save();
  // results
  res.json(user);
});

// Authenticate (login) / Sign in
usersRouter.post("/login", async (req, res) => {
  //validate input
  const { error } = validate(req.body);
  if (error) {
    res.status(400).json(error.details[0].message);
    return;
  }

  //validate system
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).send("Invalid email or password");
    return;
  }
  const passCheck = await bcrypt.compare(req.body.password, user.password);
  if (!passCheck) {
    res.status(400).send("Invalid email or password");
    return;
  }

  //process
  const token = user.generateAuthToken();
  res.send({ token });
});

// Get all users
usersRouter.get("/", authMW(), async (req, res) => {
  try {
    const allUsers = await User.find();
    res.send(allUsers);
  } catch (err) {
    res.status(401).send(err.message);
    return;
  }
});

// Get myself
usersRouter.get("/me", authMW(), async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id }).select(
      "-password -__v"
    );
    res.json(user);
  } catch (err) {
    res.statusMessage = "User was not found.";
    res.status(401).send("User was not found.");
    return;
  }
});

// Get my questions
usersRouter.get("/myQuestions", authMW(), async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id }).select(
      "questions -_id"
    );
    res.json(user.questions);
  } catch (err) {
    res.statusMessage = "User was not found.";
    res.status(401).send("User was not found.");
    return;
  }
});

// Get user by ID
usersRouter.get("/:id", authMW("isAdmin"), async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).select(
      "-password -__v"
    );
    res.json(user);
  } catch (err) {
    res.statusMessage = "User was not found.";
    res.status(401).send("User was not found.");
    return;
  }
});

// Add Score
usersRouter.put("/addScore", authMW(), async (req, res) => {

  try {
    const searchQuestion = await User.findOne({ _id: req.user._id, "questions._id": req.body._id });

    let userQuestions;

    if (searchQuestion) {
      userQuestions = await User.findOneAndUpdate({ _id: req.user._id, "questions._id": req.body._id }, { $set: { "questions.$.answer": req.body.answer, "questions.$.correct": req.body.correct } }, { new: true }).populate("questions._id").select("-_id questions");
    }
    else {
      userQuestions = await User.findOneAndUpdate({ _id: req.user._id }, { $push: { "questions": req.body } }, { new: true }).populate("questions._id").select("-_id questions");
    }
    res.send(userQuestions);
  } catch (err) {
    res.status(401).send(err.message);
  }
});


// Edit user
usersRouter.put("/:id", authMW("isAdmin", "userOwner"), async (req, res) => {
  //validate user input
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).json(error.details[0].message);
    return;
  }
  //validate system
  let user = await User.findOne({
    email: req.body.email,
    _id: { $ne: req.params.id },
  });

  if (user) {
    res.status(401).send("There is a user with this email.");
    return;
  }

  //process
  req.body.password = await bcrypt.hash(req.body.password, 12);

  try {
    const newUser = await User.findOneAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true });
    res.send(newUser);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

// Delete user
usersRouter.delete("/:id", authMW("isAdmin", "userOwner"), async (req, res) => {
  try {
    const user = await User.findOneAndRemove({ _id: req.params.id });
    if (!user) {
      res.status(401).send("The user does not exist.");
      return;
    }
    res.send(user);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email({ tlds: false }),
    password: Joi.string().min(6).max(100).required().pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*\d).{6,12}$/),
  });

  return schema.validate(user);
}

module.exports = usersRouter;