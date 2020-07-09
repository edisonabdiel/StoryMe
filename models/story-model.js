const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
  title: {
    type: String,
    // required: true
  },
  image: String,
  imageName: String,
  headline: {
    type: String,
    // required: true
  },
  category: String,
  content: String,
  likes: Number,
  duration: String,
  icon: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;