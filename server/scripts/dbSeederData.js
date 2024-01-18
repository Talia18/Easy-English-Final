const usersData = [
  {
    name: "Lior",
    phone: "0505555555",
    email: "lior@lior.com",
    password: "Aa123456!",
    address: {
      country: "Israel",
      city: "Holon",
    },
    isAdmin: true,
  },
  {
    name: "Ben",
    phone: "0505555555",
    email: "ben@ben.com",
    password: "Aa123456!",
    address: {
      country: "Israel",
      city: "Holon",
    },
    isAdmin: false,
  },
  {
    name: "Talia",
    phone: "0505555555",
    email: "talia@talia.com",
    password: "Aa123456!",
    address: {
      country: "Israel",
      city: "Holon",
    },
    isAdmin: false,
  },
];

const questionsData = [
  {
    question: "The ______ Barked.",
    options: [
      {
        number: 1,
        title: "Dog",
        correct: true,
      },
      {
        number: 2,
        title: "Mouse",
        correct: false,
      },
    ],
    levelNumber: 1,
    levelDescription: "Easy",
    tags: "animal, animals, cat, dolphin, dog, mouse, easy",
  },
  {
    question: "The ______ are high.",
    options: [
      {
        number: 1,
        title: "Eyes",
        correct: false,
      },
      {
        number: 2,
        title: "Buildings",
        correct: true,
      },
    ],
    levelNumber: 1,
    levelDescription: "Easy",
    tags: "towels, bananas, eyes, Buildings, high, easy",
  },
  {
    question: "He ______ to school everyday.",
    options: [
      {
        number: 1,
        title: "Goes",
        correct: true,
      },
      {
        number: 2,
        title: "Drinks",
        correct: false,
      },
    ],
    levelNumber: 1,
    levelDescription: "Easy",
    tags: "school, goes, drinks, jumps, writes, study, education, easy",
  },
  {
    question: "The official ______ of Brazil is Portugese.",
    options: [
      {
        number: 1,
        title: "Keyboard",
        correct: false,
      },
      {
        number: 2,
        title: "Language",
        correct: true,
      },
    ],
    levelNumber: 1,
    levelDescription: "Easy",
    tags: "official, brazil, portugese, keyboard, bench, box, language, easy",
  },
  {
    question: "After I have breakfast, I turn on my computer, and I ______.",
    options: [
      {
        number: 1,
        title: "Go to the gym",
        correct: false,
      },
      {
        number: 2,
        title: "Check my emails",
        correct: true,
      },
    ],
    levelNumber: 1,
    levelDescription: "Easy",
    tags: "breakfast, gym, emails, shopping, sleep, easy",
  },
  {
    question: "Sam ______ at 9:00 every morning and finishes at 17:00.",
    options: [
      {
        number: 1,
        title: "Starts work",
        correct: true,
      },
      {
        number: 2,
        title: "Drinks coffee",
        correct: false,
      },
    ],
    levelNumber: 1,
    levelDescription: "Easy",
    tags: "sam, morning, jumps, trampoline, coffee, easy",
  },
  {
    question: "The main weapon of the samurai is a ______.",
    options: [
      {
        number: 1,
        title: "Fork",
        correct: false,
      },
      {
        number: 2,
        title: "Hammer",
        correct: false,
      },
      {
        number: 3,
        title: "Sword",
        correct: true,
      },
      {
        number: 4,
        title: "Shoes",
        correct: false,
      },
    ],
    levelNumber: 1,
    levelDescription: "Medium",
    tags: "fork, hammer, sword, shoes, weapon, samurai, war, medium",
  },
  {
    question: "The ______ investigated the incident.",
    options: [
      {
        number: 1,
        title: "Teacher",
        correct: false,
      },
      {
        number: 2,
        title: "Detective",
        correct: true,
      },
      {
        number: 3,
        title: "Fisher",
        correct: false,
      },
      {
        number: 4,
        title: "Manager",
        correct: false,
      },
    ],
    levelNumber: 1,
    levelDescription: "Medium",
    tags: "teacher, detective, fisher, manager, investigate, incident, medium",
  },
  {
    question: "In order to relax, I listen to ______.",
    options: [
      {
        number: 1,
        title: "Music",
        correct: true,
      },
      {
        number: 2,
        title: "Physics",
        correct: false,
      },
      {
        number: 3,
        title: "Drawing",
        correct: false,
      },
      {
        number: 4,
        title: "Table",
        correct: false,
      },
    ],
    levelNumber: 1,
    levelDescription: "Medium",
    tags: "relax, listen, music, physics, drawing, table, medium",
  },
  {
    question: "Look outside! It's ______.",
    options: [
      {
        number: 1,
        title: "Knocking",
        correct: false,
      },
      {
        number: 2,
        title: "Charging",
        correct: false,
      },
      {
        number: 3,
        title: "Blessing",
        correct: false,
      },
      {
        number: 4,
        title: "Raining",
        correct: true,
      },
    ],
    levelNumber: 1,
    levelDescription: "Medium",
    tags: "look, outside, knocking, charging, blessing, raining, medium",
  },
  {
    question:
      "The workers did not receive salaries, so they decided to ______.",
    options: [
      {
        number: 1,
        title: "Dream",
        correct: false,
      },
      {
        number: 2,
        title: "Think",
        correct: false,
      },
      {
        number: 3,
        title: "Strike",
        correct: true,
      },
      {
        number: 4,
        title: "Cry",
        correct: false,
      },
    ],
    levelNumber: 1,
    levelDescription: "Medium",
    tags: "workers, salaries, dream, think, strike, cry, medium",
  },
  {
    question:
      "My uncle shouted 'I ______' when the pastor asked if there were any objectors.",
    options: [
      {
        number: 1,
        title: "Shuffle",
        correct: false,
      },
      {
        number: 2,
        title: "Object",
        correct: true,
      },
      {
        number: 3,
        title: "Talk",
        correct: false,
      },
      {
        number: 4,
        title: "Walk",
        correct: false,
      },
    ],
    levelNumber: 1,
    levelDescription: "Medium",
    tags: "pastor, objectors, shuffle, object, aalk, walk, medium",
  },

  {
    question: "The cow is a ______ animal in India.",
    options: [
      {
        number: 1,
        title: "Sacred",
        correct: true,
      },
      {
        number: 2,
        title: "Nice",
        correct: false,
      },
      {
        number: 3,
        title: "Scary",
        correct: false,
      },
      {
        number: 4,
        title: "Cute",
        correct: false,
      },
    ],
    levelNumber: 1,
    levelDescription: "Medium",
    tags: "cow, animal, india, sacred, nice, scary, cute, medium",
  },
  {
    question: "______ is the strongest material in the world.",
    options: [
      {
        number: 1,
        title: "diamond",
        correct: true,
      },
    ],
    levelNumber: 1,
    levelDescription: "Hard",
    tags: "strongest, material, oxygen, steel, diamond, coal, hard",
  },
  {
    question: "Usually, a gift is wrapped with a red ______.",
    options: [
      {
        number: 1,
        title: "ribbon",
        correct: true,
      },
    ],
    levelNumber: 1,
    levelDescription: "Hard",
    tags: "gift, wrapped, roar, ribbon, robber, runner, hard",
  },
];

module.exports = { usersData, questionsData };
