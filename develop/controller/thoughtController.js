const { Thought, User } = require('../models');

// Example data

// {
//     "thoughtText": "Here's a cool thought...",
//     "username": "lernantino",
//     "userId": "5edff358a0fcb779aa7b118b"
// }

const thoughtController = {
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find().then( (result) => {
            if (result) {
                res.status(200).json(result);
            } 
            }).catch((err) => {
                console.log('Oopsie');
                res.status(500).json({message: 'Oops, something went wrong'})
            });
        },

    // Get single thought by ID
    getSingleThought({ params }, res) {
        Thought.findOne({ _id: params.id})
            .select('-__v')
            .then(thoughtData => {
                if(!thoughtData) {
                    res.status(404).json({message: 'Oops, no thought found with this id.'});
                    return;
                }
                res.json(thoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // Add new thought
    addThought(req, res) {
        const newThought = new Thought(req.body);
        newThought.save();
        if (newThought) {
            res.status(200).json(newThought);
        } else {
            console.log('Whoops, something went wrong');
            res.status(500).json({ message: 'Whoops, something went wrong' });
        }
    },

    // Update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            // Finds first document with _id
            { _id: req.params.id },
            {thoughtText: req.body.thoughtText},
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

    // Delete a thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id:params.id})
        .then(thoughtData => {
            if(!thoughtData) {
                res.status(404).json({ message: 'Oops, no thought found with this ID.'});
                return;
            }
            res.json(thoughtData)
        })
        .catch(err => res.status(400).json(err));
    },

    // Add reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            {_id: params.id},
            { $push: { reactions: body}},
            { new: true, runValidators: true}
        )
        .then(thoughtData => {
            console.log("Updated reactions??\n\n", thoughtData)
            if (!thoughtData) {
                res.status(404).json({ message: 'Oops, no thought found with this ID.'});
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;
