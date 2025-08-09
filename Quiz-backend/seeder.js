// File: backend/seeder.js

require('dotenv').config();
const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
const connectDB = require('./config/db');

// Connect to the database
connectDB();

const quizzes = [
  // --- FUNDAMENTAL TOPICS ---
  {
    topic: 'JavaScript Basics',
    difficulty: 'easy',
    questions: [
      {
        questionText: 'Which keyword is used to declare a constant in JavaScript?',
        options: ['var', 'let', 'const', 'static'],
        correctAnswer: 'C',
        explanation: 'The `const` keyword is used to declare variables whose values are intended to remain constant throughout the program. `var` and `let` are for variables that can be reassigned.',
      },
      {
        questionText: 'What is the output of `console.log(typeof null)`?',
        options: ['"null"', '"object"', '"undefined"', '"number"'],
        correctAnswer: 'B',
        explanation: 'This is a well-known quirk in JavaScript. While `null` represents the intentional absence of any object value, the `typeof` operator incorrectly returns `"object"`.',
      },
      {
        questionText: 'Which method is used to add an element to the end of an array?',
        options: ['push()', 'pop()', 'shift()', 'unshift()'],
        correctAnswer: 'A',
        explanation: 'The `push()` method adds one or more elements to the end of an array and returns the new length of the array. `pop()` removes the last element.',
      },
      {
        questionText: 'How do you create a single-line comment in JavaScript?',
        options: ['<!-- Comment -->', '// Comment', '/* Comment */', '# Comment'],
        correctAnswer: 'B',
        explanation: 'In JavaScript, two forward slashes (`//`) are used to create a single-line comment. `/* */` is for multi-line comments.',
      },
    ],
    createdBy: '6543b57353f4d7b278f24a1b', // Replace with a valid user ID from your database
  },
  {
    topic: 'React State Management',
    difficulty: 'medium',
    questions: [
      {
        questionText: 'Which hook is used to manage state in a functional component?',
        options: ['useEffect', 'useContext', 'useState', 'useReducer'],
        correctAnswer: 'C',
        explanation: 'The `useState` hook is the most basic and common way to add state to a functional component. `useReducer` is an alternative for more complex state logic.',
      },
      {
        questionText: 'What is the purpose of the `useEffect` hook?',
        options: ['To manage state', 'To handle form submissions', 'To perform side effects in a functional component', 'To create a context'],
        correctAnswer: 'C',
        explanation: 'The `useEffect` hook is used to handle side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.',
      },
      {
        questionText: 'What is "prop drilling"?',
        options: [
          'A technique to pass props to deeply nested components.',
          'An anti-pattern where props are passed through many layers of components unnecessarily.',
          'A way to connect to a database in React.',
          'A type of component lifecycle method.',
        ],
        correctAnswer: 'B',
        explanation: 'Prop drilling is an anti-pattern where data is passed through multiple components that don\'t need it, making the code harder to read. The React Context API or state management libraries like Redux are used to solve this problem.',
      },
      {
        questionText: 'How would you correctly update state based on the previous state value?',
        options: [
          'setCount(count + 1)',
          'setCount((prevCount) => prevCount + 1)',
          'setCount({ count: count + 1 })',
          'this.setState({ count: this.state.count + 1 })',
        ],
        correctAnswer: 'B',
        explanation: 'The best practice is to use a function inside `setCount` that takes the previous state (`prevCount`) as an argument. This ensures that the state update is accurate, especially when multiple updates are triggered in quick succession.',
      },
    ],
    createdBy: '6543b57353f4d7b278f24a1b',
  },
  {
    topic: 'HTML & CSS Fundamentals',
    difficulty: 'easy',
    questions: [
      {
        questionText: 'Which HTML element is used to create a hyperlink?',
        options: ['<link>', '<a>', '<href>', '<button>'],
        correctAnswer: 'B',
        explanation: 'The `<a>` tag is used to create hyperlinks in HTML. The `<link>` tag is for linking external resources like stylesheets, and `<href>` is an attribute of the `<a>` tag.',
      },
      {
        questionText: 'What CSS property is used to change the text color of an element?',
        options: ['font-size', 'background-color', 'color', 'text-color'],
        correctAnswer: 'C',
        explanation: 'The `color` property in CSS is used to change the text color. `background-color` changes the element\'s background, and `text-color` is not a valid CSS property.',
      },
      {
        questionText: 'How would you center a block-level element horizontally in CSS?',
        options: ['text-align: center;', 'margin: auto;', 'position: center;', 'align: middle;'],
        correctAnswer: 'B',
        explanation: 'Using `margin: auto;` on a block-level element with a specified width will center it horizontally within its parent. `text-align: center;` centers inline elements.',
      },
      {
        questionText: 'Which CSS property removes the default bullet points from an unordered list?',
        options: ['list-style: none;', 'display: block;', 'text-decoration: none;', 'remove-bullets: true;'],
        correctAnswer: 'A',
        explanation: 'The `list-style: none;` property is the correct way to remove the default bullets from an unordered list (`<ul>`).',
      },
    ],
    createdBy: '6543b57353f4d7b278f24a1b',
  },
  {
    topic: 'MongoDB Queries',
    difficulty: 'medium',
    questions: [
      {
        questionText: 'What is the MongoDB equivalent of a SQL `SELECT * FROM users`?',
        options: ['db.users.find({})', 'db.users.select()', 'db.users.all()', 'db.users.get({})'],
        correctAnswer: 'A',
        explanation: 'The `find()` method in MongoDB is used to query documents. An empty object `{}` as the first argument means it will match all documents in the collection, similar to `SELECT *` in SQL.',
      },
      {
        questionText: 'Which operator is used to update a document in MongoDB?',
        options: ['$set', '$update', '$modify', '$alter'],
        correctAnswer: 'A',
        explanation: 'The `$set` operator is the primary operator used to update fields in a document, replacing the value of a field with a specified value. Other operators like `$inc` and `$push` exist for different types of updates.',
      },
      {
        questionText: 'How would you find a document where the `age` field is greater than 25?',
        options: ['db.users.find({ age: {$gt: 25} })', 'db.users.find({ age > 25 })', 'db.users.find({ age: "gt 25" })', 'db.users.find({ $gt: {age: 25} })'],
        correctAnswer: 'A',
        explanation: 'The `$gt` operator is used for "greater than" comparisons in a MongoDB query. It is placed inside the query object for the specific field you want to filter.',
      },
      {
        questionText: 'What is the function of the `explain()` method in MongoDB?',
        options: ['To provide a detailed analysis of a query plan.', 'To explain what a collection does.', 'To explain an error message.', 'To create an index.'],
        correctAnswer: 'A',
        explanation: 'The `explain()` method provides a detailed analysis of the execution plan for a query. This is a powerful tool for developers to understand how their queries are performing and to optimize them.',
      },
    ],
    createdBy: '6543b57353f4d7b278f24a1b',
  },
  // --- GENERAL KNOWLEDGE ---
  {
    topic: 'World History: Ancient Civilizations',
    difficulty: 'easy',
    questions: [
      {
        questionText: 'Which ancient civilization built the pyramids of Giza?',
        options: ['Mesopotamians', 'Romans', 'Egyptians', 'Greeks'],
        correctAnswer: 'C',
        explanation: 'The ancient Egyptians were responsible for building the pyramids, including the iconic Great Pyramids of Giza, as tombs for their pharaohs.',
      },
      {
        questionText: 'The ancient city of Rome was founded on which river?',
        options: ['The Nile', 'The Tiber', 'The Thames', 'The Euphrates'],
        correctAnswer: 'B',
        explanation: 'Rome was founded on the banks of the Tiber River in the central part of the Italian Peninsula. The river provided a water source and an easy route for trade.',
      },
      {
        questionText: 'What was the name of the first written code of law, created by the Babylonians?',
        options: ['Magna Carta', 'The Ten Commandments', 'Code of Hammurabi', 'The Constitution'],
        correctAnswer: 'C',
        explanation: 'The Code of Hammurabi was a Babylonian code of law that dates back to about 1754 BC. It is one of the oldest deciphered writings of significant length in the world.',
      },
      {
        questionText: 'What was the official language of the Roman Empire?',
        options: ['Greek', 'Italian', 'Latin', 'English'],
        correctAnswer: 'C',
        explanation: 'Latin was the official language of the Roman Empire. It was used in government, law, and the military, and it is the ancestor of many modern Romance languages.',
      },
    ],
    createdBy: '6543b57353f4d7b278f24a1b',
  },
  {
    topic: 'General Science',
    difficulty: 'easy',
    questions: [
      {
        questionText: 'What is the process by which plants make their own food?',
        options: ['Respiration', 'Photosynthesis', 'Transpiration', 'Fertilization'],
        correctAnswer: 'B',
        explanation: 'Photosynthesis is the process used by plants, algae, and certain bacteria to convert light energy into chemical energy, which is then used as fuel for their activities.',
      },
      {
        questionText: 'Which planet is known as the "Red Planet"?',
        options: ['Jupiter', 'Venus', 'Mars', 'Saturn'],
        correctAnswer: 'C',
        explanation: 'Mars is known as the Red Planet because of the high concentration of iron oxide (rust) on its surface, which gives it a reddish hue.',
      },
      {
        questionText: 'What is the chemical symbol for gold?',
        options: ['Au', 'Ag', 'Fe', 'Cu'],
        correctAnswer: 'A',
        explanation: 'The chemical symbol for gold is Au, which comes from the Latin word `aurum`.',
      },
      {
        questionText: 'How many bones are there in an adult human body?',
        options: ['200', '206', '212', '218'],
        correctAnswer: 'B',
        explanation: 'An adult human skeleton has 206 bones. A baby is born with about 300 bones, but some of them fuse together as they grow.',
      },
    ],
    createdBy: '6543b57353f4d7b278f24a1b',
  },
  {
    topic: 'Pop Culture Trivia',
    difficulty: 'medium',
    questions: [
      {
        questionText: 'What is the name of the wizarding school in the Harry Potter series?',
        options: ['Beauxbatons', 'Durmstrang', 'Hogwarts', 'Ilvermorny'],
        correctAnswer: 'C',
        explanation: 'Hogwarts School of Witchcraft and Wizardry is the primary setting for the first six books and movies in the Harry Potter series.',
      },
      {
        questionText: 'Which actor voiced both Darth Vader and Mufasa from The Lion King?',
        options: ['James Earl Jones', 'Morgan Freeman', 'Liam Neeson', 'Samuel L. Jackson'],
        correctAnswer: 'A',
        explanation: 'James Earl Jones is a famous American actor known for his distinct bass voice, which he lent to both iconic characters.',
      },
      {
        questionText: 'What item made a famous cameo in the final season of Game of Thrones?',
        options: ['A water bottle', 'A coffee cup', 'A modern cell phone', 'A television remote'],
        correctAnswer: 'B',
        explanation: 'In the final season, a modern-day coffee cup was mistakenly left on a table during a scene, sparking a viral meme and a lot of fan discussion.',
      },
      {
        questionText: 'In the TV show "Friends," what is Chandler Bing\'s middle name?',
        options: ['Matthew', 'Muriel', 'Frank', 'Ross'],
        correctAnswer: 'B',
        explanation: 'Chandler\'s full name is Chandler Muriel Bing. His middle name is famously revealed in the episode where he and Monica are trying to pick baby names.',
      },
    ],
    createdBy: '6543b57353f4d7b278f24a1b',
  },
  // --- SPECIALIZED TOPICS ---
  {
    topic: 'Quantum Physics for Beginners',
    difficulty: 'hard',
    questions: [
      {
        questionText: 'Which principle states that you cannot know both a particle\'s position and its momentum with perfect accuracy at the same time?',
        options: ['The Law of Conservation', 'The Heisenberg Uncertainty Principle', 'Schrödinger\'s Cat Principle', 'The Pauli Exclusion Principle'],
        correctAnswer: 'B',
        explanation: 'The Heisenberg Uncertainty Principle is a fundamental concept in quantum mechanics that states there is a limit to the precision with which certain pairs of physical properties, such as position and momentum, can be known simultaneously.',
      },
      {
        questionText: 'What are particles with integer spin called?',
        options: ['Fermions', 'Bosons', 'Quarks', 'Leptons'],
        correctAnswer: 'A',
        explanation: 'Particles with integer spin are called bosons, named after the physicist Satyendra Nath Bose. They include photons and gluons. Fermions have half-integer spin.',
      },
      {
        questionText: 'What concept describes the phenomenon where a particle can exist in multiple states at once until measured?',
        options: ['Entanglement', 'Superposition', 'Quantum Tunneling', 'Uncertainty'],
        correctAnswer: 'B',
        explanation: 'Superposition is a principle of quantum mechanics that states a quantum system can exist in a combination of multiple states simultaneously. The system collapses into a single state only when it is observed or measured.',
      },
      {
        questionText: 'The idea that light has properties of both a particle and a wave is known as what?',
        options: ['Quantum Entanglement', 'Photon Duality', 'Wave-Particle Duality', 'Quantum Superposition'],
        correctAnswer: 'C',
        explanation: 'Wave-particle duality is a central concept in quantum mechanics, stating that every particle or quantum entity may be described as either a particle or a wave.',
      },
    ],
    createdBy: '6543b57353f4d7b278f24a1b',
  },
  {
    topic: 'Machine Learning Basics',
    difficulty: 'medium',
    questions: [
      {
        questionText: 'Which of the following is not a type of machine learning?',
        options: ['Supervised Learning', 'Unsupervised Learning', 'Constructive Learning', 'Reinforcement Learning'],
        correctAnswer: 'C',
        explanation: 'The three main types of machine learning are supervised, unsupervised, and reinforcement learning. Constructive learning is not a standard type of machine learning.',
      },
      {
        questionText: 'What is overfitting in machine learning?',
        options: [
          'When a model performs well on training data but poorly on new data.',
          'When a model is too simple to capture the underlying patterns in the data.',
          'When a model is trained on a small dataset.',
          'When a model has a high bias and low variance.',
        ],
        correctAnswer: 'A',
        explanation: 'Overfitting occurs when a machine learning model memorizes the training data, including its noise and random fluctuations, instead of learning the underlying patterns. As a result, it performs poorly on new, unseen data.',
      },
      {
        questionText: 'What is the purpose of a "loss function"?',
        options: ['To measure the memory usage of a model.', 'To quantify the error of a model.', 'To reduce the number of features.', 'To speed up the training process.'],
        correctAnswer: 'B',
        explanation: 'A loss function measures the difference between a model\'s predicted output and the actual output. The goal of a machine learning algorithm is to minimize this loss function during training.',
      },
      {
        questionText: 'Which algorithm is a type of supervised learning?',
        options: ['K-Means Clustering', 'Principal Component Analysis (PCA)', 'Decision Tree', 'Apriori Algorithm'],
        correctAnswer: 'C',
        explanation: 'Decision Trees are a type of supervised learning algorithm used for both classification and regression tasks. K-Means and PCA are unsupervised algorithms.',
      },
    ],
    createdBy: '6543b57353f4d7b278f24a1b',
  },
  {
    topic: 'Software Development Life Cycle (SDLC)',
    difficulty: 'medium',
    questions: [
      {
        questionText: 'What is the first step in the traditional Waterfall SDLC model?',
        options: ['Design', 'Coding', 'Requirements Gathering', 'Testing'],
        correctAnswer: 'C',
        explanation: 'The Waterfall model is a linear and sequential approach where the first phase is always requirements gathering. Each phase must be completed before the next one begins.',
      },
      {
        questionText: 'Which SDLC model is characterized by short development cycles and frequent releases?',
        options: ['Waterfall', 'Spiral', 'Agile', 'V-Model'],
        correctAnswer: 'C',
        explanation: 'The Agile model is an iterative approach that focuses on short development cycles (sprints), continuous customer feedback, and adapting to changing requirements. This contrasts with the rigid, sequential nature of the Waterfall model.',
      },
      {
        questionText: 'What does the acronym SDLC stand for?',
        options: ['System Design and Logic Code', 'Software Development Lifecycle', 'Software Design and Lifecycle', 'System Documentation and Lifecycle'],
        correctAnswer: 'B',
        explanation: 'SDLC stands for Software Development Lifecycle. It is a systematic process for developing software, from initial planning to maintenance and disposal.',
      },
      {
        questionText: 'Which phase of the SDLC is responsible for fixing defects and making enhancements after the software is released?',
        options: ['Deployment', 'Testing', 'Maintenance', 'Design'],
        correctAnswer: 'C',
        explanation: 'The maintenance phase is the final phase of the SDLC. It involves fixing bugs, making enhancements, and ensuring the software continues to meet user needs in a live environment.',
      },
    ],
    createdBy: '6543b57353f4d7b278f24a1b',
  },
   // --- Additional Quizzes for Categories ---
  {
    topic: 'General Knowledge Trivia',
    difficulty: 'easy',
    questions: [
      {
        questionText: 'What is the largest mammal in the world?',
        options: ['Elephant', 'Giraffe', 'Blue Whale', 'Great White Shark'],
        correctAnswer: 'C',
        explanation: 'The blue whale is the largest mammal in the world, and also the largest animal ever known to have existed.',
      },
      {
        questionText: 'How many planets are in our solar system?',
        options: ['7', '8', '9', '10'],
        correctAnswer: 'B',
        explanation: 'There are eight planets in our solar system: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. Pluto was reclassified as a dwarf planet in 2006.',
      },
      {
        questionText: 'Who wrote the play "Romeo and Juliet"?',
        options: ['William Shakespeare', 'Charles Dickens', 'Jane Austen', 'Mark Twain'],
        correctAnswer: 'A',
        explanation: 'William Shakespeare is a famous English playwright and poet who is widely regarded as the greatest writer in the English language.',
      },
      {
        questionText: 'What is the main ingredient in guacamole?',
        options: ['Tomato', 'Onion', 'Avocado', 'Lime'],
        correctAnswer: 'C',
        explanation: 'Guacamole is a popular dip made primarily from mashed avocados, along with other ingredients like onions, tomatoes, and lime juice.',
      },
    ],
    createdBy: '6543b57353f4d7b278f24a1b',
  },
  {
    topic: 'Arts & Literature',
    difficulty: 'medium',
    questions: [
      {
        questionText: 'Who painted the Mona Lisa?',
        options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Claude Monet'],
        correctAnswer: 'C',
        explanation: 'The Mona Lisa is a famous oil painting created by the Italian artist Leonardo da Vinci during the Renaissance period.',
      },
      {
        questionText: 'Which of these novels was written by Jane Austen?',
        options: ['Wuthering Heights', 'Pride and Prejudice', 'Frankenstein', 'Moby Dick'],
        correctAnswer: 'B',
        explanation: '`Pride and Prejudice` is one of Jane Austen\'s most famous novels. `Wuthering Heights` was written by Emily Brontë, `Frankenstein` by Mary Shelley, and `Moby Dick` by Herman Melville.',
      },
      {
        questionText: 'What is a haiku?',
        options: ['A form of a Japanese poem', 'A type of painting', 'A musical instrument', 'A dance form'],
        correctAnswer: 'A',
        explanation: 'A haiku is a traditional form of Japanese poetry that consists of three phrases with a 5, 7, 5 syllable structure.',
      },
      {
        questionText: 'Who is the author of "1984"?',
        options: ['George Orwell', 'Aldous Huxley', 'F. Scott Fitzgerald', 'Ernest Hemingway'],
        correctAnswer: 'A',
        explanation: '`1984` is a dystopian social science fiction novel by English author George Orwell. It was published in 1949.',
      },
    ],
    createdBy: '6543b57353f4d7b278f24a1b',
  },
];

const importData = async () => {
  try {
    await Quiz.deleteMany(); // Deletes existing quizzes to avoid duplicates
    await Quiz.insertMany(quizzes);
    console.log('Quiz Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Quiz.deleteMany();
    console.log('Quiz Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
