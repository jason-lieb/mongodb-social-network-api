const { User, Thought } = require('../models')

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find({})
      res.status(200).json(users)
    } catch (err) {
      return res.status(500).json(err)
    }
  },
  async getUser(req, res) {
    try {
      const user = await User.find({ _id: req.params.userId }).select('-__v') /////////////////////////////////////////
      if (!user) return res.status(400).json({ message: 'User does not exist' })
      res.status(200).json(user)
    } catch (err) {
      return res.status(500).json(err)
    }
  },
  async postUser(req, res) {
    try {
      const user = await User.create(req.body)
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async putUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
      res.status(200).json(user)
    } catch (err) {
      return res.status(500).json(err)
    }
  },
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId })
      if (!user) return res.status(400).json({ message: 'User does not exist' })
      Thought.deleteMany({ _id: { $in: user.thoughts } })
      res.status(200).json(user)
    } catch (err) {
      return res.status(500).json(err)
    }
  },
  async postFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      )
      if (!user) res.status(400).json({ message: 'User does not exist' })
      res.status(200).json(user)
    } catch (err) {
      return res.status(500).json(err)
    }
  },
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      )
      if (!user) res.status(400).json({ message: 'User does not exist' })
      res.status(200).json(user)
    } catch (err) {
      return res.status(500).json(err)
    }
  },
}
