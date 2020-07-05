const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
    title: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        // required: true
    },
    content: { type: String }

});

const Story = mongoose.model('Story', storySchema);
module.exports = Story;