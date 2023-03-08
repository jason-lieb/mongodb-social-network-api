const router = require('express').Router()

const {
  getThoughts,
  getThought,
  postThought,
  putThought,
  deleteThought,
  postReaction,
  deleteReaction,
} = require('../../controllers/thoughtsController')

router.route('/').get(getThoughts).post(postThought)

router
  .route('/:thoughtId')
  .get(getThought)
  .put(putThought)
  .delete(deleteThought)

router.route('/thoughts/:thoughtId/reactions').post(postReaction)

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)

module.exports = router
