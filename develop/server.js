const express = require('express');
const db = require('./config/connection');
// Require model
const { User, Thought } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API Routes
// /api/users

// GET all users
app.get('/api/users', (req, res) => {
  User.find().then( (result) => {
    if (result) {
      res.status(200).json(result);
    } 
  }).catch((err) => {
    console.log('whoops');
    res.status(500).json({message: 'whoops, something went wrong'})
  })
});

// TODO: GET a single user by its _id and populated thought and friend data


// POST a new user:
app.post('/api/users', (req, res) => {
  const newUser = new User(req.body);
  newUser.save();
  if (newUser) {
    res.status(200).json(newUser);
  } else {
    console.log('Whoops, something went wrong');
    res.status(500).json({ message: 'Whoops, something went wrong' });
  }
});

// example data
// {
//   "username": "lernantino",
//   "email": "lernantino@gmail.com"
// }

// PUT to update a user by its _id
app.put('/find-one-update/:user', (req, res) => {
  // Uses findOneAndUpdate() method on model
  User.findOneAndUpdate(
    // Finds first document with _id
    { _id: req.params.user },
    // Replaces name with value in URL param
    { email: req.body.email },
    // Sets to true so updated document is returned; Otherwise original document will be returned
    { new: true },
    (err, result) => {
      if (result) {
        res.status(200).json(result);
        console.log(`Updated: ${result}`);
      } else {
        console.log('Whoops, something went wrong');
        res.status(500).json({ message: 'Whoops, something went wrong' });
      }
    }
  );
});

// TODO: DELETE to remove user by its _id



// /api/users/:userId/friends/:friendId

// TODO: POST to add a new friend to a user's friend list

// TODO: DELETE to remove a friend from a user's friend list



// /api/thoughts

// TODO: GET to get all thoughts

// TODO: GET to get a single thought by its _id

// TODO: POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)

// // example data
// {
//   "thoughtText": "Here's a cool thought...",
//   "username": "lernantino",
//   "userId": "5edff358a0fcb779aa7b118b"
// }

// TODO: PUT to update a thought by its _id


// TODO: DELETE to remove a thought by its _id



// /api/thoughts/:thoughtId/reactions

// TODO: POST to create a reaction stored in a single thought's reactions array field

// TODO: DELETE to pull and remove a reaction by the reaction's reactionId value



// ------------------------- Examples -----------------------------

// Creates a new document
// app.post('/new-genre/:genre', (req, res) => {
//   const newGenre = new Genre({ name: req.params.genre });
//   newGenre.save();
//   if (newGenre) {
//     res.status(200).json(newGenre);
//   } else {
//     console.log('Uh Oh, something went wrong');
//     res.status(500).json({ message: 'something went wrong' });
//   }
// });

// // Find first document with name equal to "Kids"
// app.get('/find-kids-genre', (req, res) => {
//   Genre.findOne({ name: 'Kids' }, (err, result) => {
//     if (result) {
//       res.status(200).json(result);
//     } else {
//       console.log('Uh Oh, something went wrong');
//       res.status(500).json({ message: 'something went wrong' });
//     }
//   });
// });

// // Finds first document that matches and deletes
// app.delete('/find-one-delete/:genre', (req, res) => {
//   Genre.findOneAndDelete({ name: req.params.genre }, (err, result) => {
//     if (result) {
//       res.status(200).json(result);
//       console.log(`Deleted: ${result}`);
//     } else {
//       console.log('Uh Oh, something went wrong');
//       res.status(500).json({ message: 'something went wrong' });
//     }
//   });
// });

// // Finds the first document with the name with the value equal to 'Kids' and updates that name to the provided URL param value
// app.post('/find-one-update/:genre', (req, res) => {
//   // Uses findOneAndUpdate() method on model
//   Genre.findOneAndUpdate(
//     // Finds first document with name of "Kids"
//     { name: 'Kids' },
//     // Replaces name with value in URL param
//     { name: req.params.genre },
//     // Sets to true so updated document is returned; Otherwise original document will be returned
//     { new: true },
//     (err, result) => {
//       if (result) {
//         res.status(200).json(result);
//         console.log(`Updated: ${result}`);
//       } else {
//         console.log('Uh Oh, something went wrong');
//         res.status(500).json({ message: 'something went wrong' });
//       }
//     }
//   );
// });

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
