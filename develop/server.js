const mongoose = require('mongoose');
const express = require('express');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require('./routes'));


// // GET all users
// app.get('/api/users', (req, res) => {
//   User.find().then( (result) => {
//     if (result) {
//       res.status(200).json(result);
//     } 
//   }).catch((err) => {
//     console.log('whoops');
//     res.status(500).json({message: 'whoops, something went wrong'})
//   })
// });

// // TODO: GET a single user by its _id and populated thought and friend data


// // POST a new user:
// app.post('/api/users', (req, res) => {
//   const newUser = new User(req.body);
//   newUser.save();
//   if (newUser) {
//     res.status(200).json(newUser);
//   } else {
//     console.log('Whoops, something went wrong');
//     res.status(500).json({ message: 'Whoops, something went wrong' });
//   }
// });

// // example data
// // {
// //   "username": "lernantino",
// //   "email": "lernantino@gmail.com"
// // }

// // PUT to update a user by its _id
// app.put('/find-one-update/:user', (req, res) => {
//   // Uses findOneAndUpdate() method on model
//   User.findOneAndUpdate(
//     // Finds first document with _id
//     { _id: req.params.user },
//     // Replaces name with value in URL param
//     { email: req.body.email },
//     // Sets to true so updated document is returned; Otherwise original document will be returned
//     { new: true },
//     (err, result) => {
//       if (result) {
//         res.status(200).json(result);
//         console.log(`Updated: ${result}`);
//       } else {
//         console.log('Whoops, something went wrong');
//         res.status(500).json({ message: 'Whoops, something went wrong' });
//       }
//     }
//   );
// });


db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
