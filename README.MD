# EasyEnglish -

## Description

"EasyEnglish" is an educational application for learning English. In this app you can practice you eanglish anywhere and anytime in 3 different levels - "Easy", "Medium" and "Hard".

## Install

1. Download the project.

2. Open new terminal in "server" folder, and in the command line write the command:

```
npm i
```

to install all the required libraries.

3. Change the "env.example" file to ".env" and enter the various variables (if needed). Delete the variables which are not needed.
   Default values for various variables, used in the project, can be found under config->default.json.

4. Open new terminal in "front" folder, and in the command line write the command:

```
npm i
```

to install all the required libraries.

5. In the end, after doing all that, you can write in the command line of the "server" terminal:

```
npm run dev
```

for development purposes,

and in the "front" terminal

```
npm run start
```

for production.

## Seeding DB

Under the folder called "scripts" there is a file called "dbSeeder.js". This file seeds the DB of 3 different users (the first one is defined as "Admin") and many different questions in different levels - "Easy", "Medium" and "Hard".

In order to run this file, write in the command line of the "server" terminal:

```
npm run seed-db
```

Important information:

- The seeding process empties both collections (users and questions) before inserting the data.
- The seeded data can be changed in file called scripts->dbSeederData.js.
- Only one of the users is defined as an "Admin" (the first one) and has the option to perform various administrator actions that no one else has.

## Usage

In the tables below you will see two different tables.

The first table is "User Routes".

The second table is "Question Routes".

### Users Routes / Users end points

| No. | URL                | method | Authorization                | action                       | notice       | return             |
| --- | ------------------ | ------ | ---------------------------- | ---------------------------- | ------------ | ------------------ |
| 1.  | /users             | POST   | All                          | Register user                | Unique email | The created User   |
| 2.  | /users/login       | POST   | All                          | Login                        | ---          | Encrypt token      |
| 3.  | /users             | GET    | The registered user or admin | Get all users                | ---          | Array of users     |
| 4.  | /users/me          | GET    | The registered user or admin | Get user                     | ---          | The user himself   |
| 5.  | /users/myQuestions | GET    | The registered user or admin | Get user Questions           | ---          | Array of questions |
| 6.  | /users/:id         | GET    | Admin                        | Get user by ID               | ---          | User               |
| 7.  | /users/addScore    | PUT    | The registered user or admin | Update the answers of a user | ---          | User's answers     |
| 8.  | /users/:id         | PUT    | The registered user or admin | Update a user                | ---          | User               |
| 9.  | /users/:id         | DELETE | The registered user or admin | Delete a user                | ---          | User               |

### Questions Routes / Questions end points

| No. | URL            | method | Authorization                | action               | return             |
| --- | -------------- | ------ | ---------------------------- | -------------------- | ------------------ |
| 1.  | /questions     | GET    | The registered user or admin | Get all questions    | Array of questions |
| 2.  | /questions/:id | GET    | All                          | Get a question by ID | Question           |
| 3.  | /questions     | POST   | Admin                        | Create new question  | Question           |
| 4.  | /questions/:id | PUT    | Admin                        | Edit question        | Question           |
| 5.  | /questions/:id | DELETE | Admin                        | Delete question      | Question           |

## Models

### User Model / Schema

```
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
  }
```

- Various "\_id" properties are determined automatically.

### Minimum Input Required For User Model

```
{
    "name": "Avi Levi",
    "phone": "0505555555",
    "email": "avilevi@gmail.com"
    "password": "Aa123456"
}
```

### Question Model / Schema

```
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
  }
```

## Libraries

1. "node.js" : main platform.
2. "express": managing routes and requests.
3. "mongoose": connecting to and managing MongoDB database.
4. "joi" : validation.
5. "bcrypt": password encryption.
6. "dotenv": injecting environment variables.
7. "config" : various configuration variables (including environment variables).
8. "jsonwebtoken": creating user token.
9. "cors": for handling cors.
10. "chalk": adding color to your console.
11. "morgan": logging requests to the console.
12. "lodash": for easy functionality.

### Have Fun !
