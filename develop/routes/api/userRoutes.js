const router = require('express').Router();

// /api/user
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
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

module.exports = router; 