const { User } = require('../models');


const userController = {
    // get all users
    getUsers(req, res) {
    User.find().then( (result) => {
        if (result) {
            res.status(200).json(result);
        } 
        }).catch((err) => {
            console.log('whoops');
            res.status(500).json({message: 'whoops, something went wrong'})
        });
    },

    // get one user by id


    // create a user
    createUser(req, res) {
        const newUser = new User(req.body);
        newUser.save();
        if (newUser) {
            res.status(200).json(newUser);
        } else {
            console.log('Whoops, something went wrong');
            res.status(500).json({ message: 'Whoops, something went wrong' });
        }
    },

    // update user by id
    updateUser(req, res) {
    // Uses findOneAndUpdate() method on model
    User.findOneAndUpdate(
        // Finds first document with _id
        { _id: req.params.id },
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
        })
    },
  

    // delete user


};


module.exports = userController;