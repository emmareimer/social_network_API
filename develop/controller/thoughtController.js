const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getThoughts(req, res) {
        Thought.find().then( (result) => {
            if (result) {
                res.status(200).json(result);
            } 
            }).catch((err) => {
                console.log('whoops');
                res.status(500).json({message: 'whoops, something went wrong'})
            });
        },

//     // get a thought by id


// {
//     "thoughtText": "Here's a cool thought...",
//     "username": "lernantino",
//     "userId": "5edff358a0fcb779aa7b118b"
// }

//     // add a thought
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


//     // update a thought


//     // delete a thought


//     // add reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            {_id: params.id},
            { $push: { reactions: body}},
            { new: true, runValidators: true}
        )
        .then(socialNetworkDB => {
            console.log("Updated reactions??\n\n", socialNetworkDB)
            if (!socialNetworkDB) {
                res.status(404).json({ message: 'Oops, no thought found with this ID.'});
                return;
            }
            res.json(socialNetworkDB);
        })
        .catch(err => res.json(err));
    }

};

module.exports = thoughtController;
