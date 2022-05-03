const router = require('express').Router();

const {
    getThoughts,
    addThought,
    getSingleThought,
    updateThought,
    deleteThought,
    addReaction
} = require('../../controller/thoughtController');

router
    .route('/')
    .get(getThoughts);

// router
//     .route('/:id')
//     .get(getSingleThought)
//     .put(updateThought)
//     .delete(deleteThought);

router
    .route('/:id/reaction')
    .post(addReaction);

router
    .route('/:userId')
    .post(addThought);

module.exports = router;