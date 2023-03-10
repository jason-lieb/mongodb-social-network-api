const { Schema, model, Types } = require('mongoose')

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
    },
    thoughts: [{ type: Types.ObjectId, ref: 'thought' }],
    friends: [{ type: Types.ObjectId, ref: 'user' }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
)

userSchema.virtual('friendCount').get(function () {
  return this.friends?.length
})

module.exports = model('user', userSchema)
