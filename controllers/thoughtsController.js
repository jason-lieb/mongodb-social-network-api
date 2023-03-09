const { User, Thought } = require('../models')

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find({})
      res.status(200).json(thoughts)
    } catch (err) {
      return res.status(500).json(err)
    }
  },
  async getThought(req, res) {
    try {
      const thought = await Thought.find({ _id: req.params.thoughtId })
      if (!thought)
        return res.status(400).json({ message: 'Thought does not exist' })
      res.status(200).json(thought)
    } catch (err) {
      return res.status(500).json(err)
    }
  },
  async postThought(req, res) {
    try {
      const thought = await Thought.create(req.body)
      const _ = await User.findOneAndUpdate(
        { _id: req.body.id },
        { $addToSet: { thoughts: thought._id } },
        { runValidators: true, new: true }
      )
      res.status(200).json(thought)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async putThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
      if (!thought)
        return res.status(400).json({ message: 'Thought does not exist' })
      res.status(200).json(thought)
    } catch (err) {
      return res.status(500).json(err)
    }
  },
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      })
      res.status(200).json(thought)
    } catch (err) {
      return res.status(500).json(err)
    }
  },
  async postReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      )
      if (!thought) res.status(400).json({ message: 'Thought does not exist' })
      res.status(200).json(thought)
    } catch (err) {
      return res.status(500).json(err)
    }
  },
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      )
      if (!thought) res.status(400).json({ message: 'Thought does not exist' })
      res.status(200).json(thought)
    } catch (err) {
      return res.status(500).json(err)
    }
  },
}
