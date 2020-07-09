const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const storySchema = new Schema({
  title: {
    type: String,
    // required: true
  },
  image: String,
  headline: {
    type: String,
    // required: true
  },
  icon: {
    type: String,
    enum: [
      'now-ui-icons users_single-02',
      'now-ui-icons ui-1_zoom-bold',
      'now-ui-icons ui-2_favourite-28',
      'now-ui-icons tech_controller-modern',
      'now-ui-icons transportation_air-baloon',
      'now-ui-icons sport_user-run',
      'now-ui-icons education_glasses',
      'now-ui-icons objects_planet',
      'now-ui-icons objects_diamond',
      'now-ui-icons objects_spaceship',
      'now-ui-icons media-2_sound-wave',
      'now-ui-icons files_paper',
      'now-ui-icons files_single-copy-04',
      'now-ui-icons emoticons_satisfied',
      'now-ui-icons design_app',
      'now-ui-icons design_palette',
      'now-ui-icons business_money-coins',
      'now-ui-icons business_bulb-63'
    ]
  },
  // icon: String,
  category: String,
  content: String,
  likes: Number,
  duration: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;