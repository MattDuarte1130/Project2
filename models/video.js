const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    videoTitle: { type: String, required: true },
    videoImg: { type: String, required: true },
    videoDescription: { type: String, required: true },
    videoLink: { type: String, required: true },

});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
