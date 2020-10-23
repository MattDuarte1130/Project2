const express = require('express')
const router = express.Router()
const Playlist = require('../models/playlist.js')
const Video = require('../models/video.js')

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
   title: req.body.title,
   description: req.body.description,
   img: req.body.img,
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



// video
router.get('/:id/video', (req, res, next) => {
  Playlist.findById(req.params.id, (err, foundVideo)=>{
      res.render('playlist/video.ejs', {
          playlist:foundVideo,
      });
  });
});

// add page
router.get('/:id/video/add', (req, res) => {
Playlist.findById(req.params.id, (err, data) => {
  res.render('playlist/add.ejs', {
    idOfPlaylistToEdit:data,
    idForPlaylist: req.params.id
    })
  })
})


// add video
router.put('/:id/video', (req, res, next) => {
  Playlist.findById(req.params.id, (err, data) => {
      let vidLink = req.body.videoLink
      let useLink = vidLink.split('=')
      let link = useLink[1];
    data.videoTitle.push(req.body.videoTitle)
    data.videoDescription.push(req.body.videoDescription)
    data.videoLink.push(link)
    data.save(function(err, updatedData) {
        console.log(updatedData)
    })
  })
  res.redirect(`/playlist`)
})

module.exports = router
