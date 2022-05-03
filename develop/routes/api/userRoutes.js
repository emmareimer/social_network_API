const router = require('express').Router();

// /api/user
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  // deleteFriend
} = require('../../controller/userController');

router
  .route('/')
    .get(getUsers)
    .post(createUser);

// /api/user/:id
router
  .route('/:id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

router
  .route(':id/friends/:friendId')
    .post(addFriend)
    // .delete(deleteFriend);

module.exports = router; 