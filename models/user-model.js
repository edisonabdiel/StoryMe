const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // role: {
  //   type: String,
  //   enum: ['admin', 'member'],
  //   default: 'member'
  // },
  isVerified: {
    type: Boolean,
    default: false
  },

  image: String,
  userName: String,
  about: String,
  imageName: String,
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }]

},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;