const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    title:  { type: String, required: true },
    description:  { type: String, required: true },
    img: String,
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
