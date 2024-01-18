const questionsRouter = require("express").Router();
const authMW = require("../middleware/authMW");
const { Question, validateQuestion } = require("../models/questionsModel");

// Get all questions
questionsRouter.get("/", authMW(), async (req, res) => {
    try {
        const questions = await Question.find();
        res.send(questions);
    } catch (err) {
        res.status(401).send(err.message);
    }
});

// Get question by ID
questionsRouter.get("/:id", async (req, res) => {
    try {
        const question = await Question.findOne({ _id: req.params.id });
        res.send(question);
    } catch (err) {
        res.status(401).send(err.message);
    }
});

// Create new question 
questionsRouter.post("/", authMW("isAdmin"), async (req, res) => {
    const { error } = validateQuestion(req.body);
    if (error) {
        res.status(401).send(error.details[0].message);
        return;
    }
    let question = new Question(req.body);
    try {
        await question.save();
        res.send(question);
    } catch (err) {
        res.status(401).send(err.message);
    }
});

// Edit question 
questionsRouter.put("/:id", authMW("isAdmin"), async (req, res) => {
    const { error } = validateQuestion(req.body);
    if (error) {
        res.status(401).send(error.details[0].message);
        return;
    }
    try {
        const question = await Question.findOneAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true });
        res.send(question);
    } catch (err) {
        res.status(401).send(err.message);
    }
});

// Delete question
questionsRouter.delete("/:id", authMW("isAdmin"), async (req, res) => {
    try {
        const question = await Question.findOneAndDelete({ _id: req.params.id });
        res.send(question);
    } catch (err) {
        res.status(401).send(err.message);
    }
});

module.exports = questionsRouter;