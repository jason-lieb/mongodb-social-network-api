const router = require('express').Router()

const {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
  postFriend,
  deleteFriend,
} = require('../../controllers/usersController')

router.route('/').get(getUsers).post(postUser)

router.route('/:userId').get(getUser).put(putUser).delete(deleteUser)

router.route('/:userId/friends/:friendId').post(postFriend).delete(deleteFriend)

module.exports = router
