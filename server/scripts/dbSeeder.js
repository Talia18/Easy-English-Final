require("dotenv/config");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { User } = require("../models/usersModel");
const { Question } = require("../models/questionsModel");
const { usersData, questionsData } = require("./dbSeederData");
const config = require("config");
const chalk = require("chalk");

mongoose
  .connect(config.get("mongoDB.MONGO_URI"))
  .then(() => console.log(chalk.green("connected to db successfully")))
  .then(seed)
  .then(() => mongoose.connection.close())
  .catch((err) => console.log(chalk.red(`could not connect to db: ${err}`)));

async function seed() {
  await User.deleteMany();
  await Question.deleteMany();

  for (let i = 0; i < usersData.length - 1; i++) {
    await seedUser(usersData[i]);
  }

  const user = await seedUser(usersData[usersData.length - 1]);

  for (let j = 0; j < questionsData.length; j++) {
    await seedQuestion(questionsData[j]);
  }

  console.log(
    chalk.black.bgWhiteBright(
      "Seeding Complete. Run 'npm run start/dev' to start the application..."
    )
  );
}

async function seedUser(userData) {
  const user = await new User({
    ...userData,
    "password": await bcrypt.hash(userData.password, 12),
  }).save();

  console.log(chalk.white.bgBlue(`New User: ${userData.email}`));

  return user;
}
async function seedQuestion(question) {
  const savedQuestion = await new Question(
    question
  ).save();

  console.log(chalk.white.bgGreen(`new Question: ${savedQuestion.question}`));

  return savedQuestion;
}
