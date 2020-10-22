const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    title:  { type: String, required: true },
    description:  { type: String, required: true },
    img: { type: String, required: true },
    videoTitle: { type: String, required: true },
    videoImg: { type: String, required: true },
    videoDescription: { type: String, required: true },
    videoLink: [String],

});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
