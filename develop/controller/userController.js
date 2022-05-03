const { User } = require('../models');

// Example data

// {
//     "username": "lernantino",
//     "email": "lernantino@gmail.com"
// }

const userController = {
    // Get all users
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

    // Get single user by ID
    getSingleUser({ params }, res) {
        User.findOne({ _id: params.id})
            .populate({
                path: 'thoughts',
                select: '__v'
            })
            .select('-__v')
            .then(userData => {
                if(!userData) {
                    res.status(404).json({message: 'Oops, no user found with this id.'});
                    return;
                }
                res.json(userData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // Create new user
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

    // Update user by id
    updateUser(req, res) {
    User.findOneAndUpdate(
        // Finds first document with _id
        { _id: req.params.id },
        { email: req.body.email },
        { new: true },
        (err, result) => {
            if (result) {
                res.status(200).json(result);
                console.log(`Updated: ${result}`);
            } else {
                console.log('Oops, something went wrong');
                res.status(500).json({ message: 'Oops, something went wrong' });
            }
        })
    },
  
    // Delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id:params.id})
        .then(userData => {
            if(!userData) {
                res.status(404).json({ message: 'Oops, no user found with this ID.'});
                return;
            }
            res.json(userData)
        })
        .catch(err => res.status(400).json(err));
    },

    // Add friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
                {_id: params.id},
                { $push: { friends: params.friendId}},
                { new: true }
            .populate({
                path: 'thoughts',
                select: '__v'
            })
            .select('-__v')
        .then(userData => {
            if(!userData) {
                res.status(404).json({message: 'Oops, no user found with this id.'});
                return;
            }
            res.json(userData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    )},

    // deleteFriend({ params }, res) {
    //     User.findOneAndDelete({ _id:params.id})
    //     .then(userData => {
    //         if(!userData) {
    //             res.status(404).json({ message: 'Oops, no user found with this ID.'});
    //             return;
    //         }
    //         res.json(userData)
    //     })
    //     .catch(err => res.status(400).json(err));
    // },
};


module.exports = userController;