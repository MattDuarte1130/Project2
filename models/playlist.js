const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    title:  { type: String, required: true },
    description:  { type: String, required: true },
    img: { type: String, required: true },
    videoTitle: [String],
    videoDescription: [String],
    videoLink: [String],
    videoImg: [String],
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
