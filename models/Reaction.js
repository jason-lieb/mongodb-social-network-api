const { Schema } = require('mongoose')

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: new Schema.Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: date.now,
      get: (date) => date.toLocaleString('en-US'),
    },
  },
  {
    toJson: {
      getters: true,
    },
    id: false,
  }
)

module.exports = reactionSchema
