const express = require('express')
const router = express.Router()
const Playlist = require('../models/playlist.js')

// new

router.get('/new', (req, res) => {
  res.render('playlist/new.ejs')
})

// create

router.post('/', (req,res) => {
  Playlist.create(req.body, (error, createdPlaylist)=>{
    res.redirect('/playlist');
  });
})

// // index

router.get('/', (req, res)=>{
    Playlist.find({}, (error, allPlaylist)=>{
        res.render('playlist/index.ejs', {
            playlist: allPlaylist
        });
    });
});

// //show

router.get('/:id', (req, res)=>{
    Playlist.findById(req.params.id, (err, foundPlaylist)=>{
        res.render('playlist/show.ejs', {
            playlist:foundPlaylist
        });
    });
});

// // delete
router.delete('/:id', (req,res) => {
  Playlist.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/playlist');
    console.log('deleted Playlist')
  })
})

// edit

router.get('/:id/edit', (req, res) => {
Playlist.findById(req.params.id, (err, data) => {
  res.render('playlist/edit.ejs', {
    idOfPlaylistToEdit:data,
    idForPlaylist: req.params.id
    })
  })
})

// Put

router.put('/:id', (req, res, next) => {
  const updatedPlaylist = {
   name: req.body.name,
   description: req.body.description,
   price: req.body.price,
   img: req.body.img,
   qty: req.body.qty,
 }
  Playlist.findByIdAndUpdate(req.params.id, updatedPlaylist, (err, data) => {
      if (err) {
        console.log("error")
        next(err)
      } else {
        console.log('updated')
      }
  })
  res.redirect('/playlist')
})



module.exports = router
