const express = require('express')
const router = express.Router()
const Playlist = require('../models/playlist.js')



const isAuthenticated = (req, res, next) =>  {
	if (req.session.currentUser) {
		return next()
	} else {
		res.redirect('/sessions/new')
	}
}


// new

router.get('/new', isAuthenticated, (req, res) => {
  res.render('playlist/new.ejs', {currentUser: req.session.currentUser})
})

// create

router.post('/', isAuthenticated, (req,res) => {
	const data = {
		...req.body,
		userId: req.session.currentUser._id
	}
	console.log(data)
  Playlist.create(data, (error, createdPlaylist)=>{
		if (error){
			console.log(error)
		}
    res.redirect('/playlist');
  });
})

// // index

router.get('/', isAuthenticated, (req, res)=>{

    Playlist.find({userId: req.session.currentUser._id}, (error, allPlaylist)=>{
        res.render('playlist/index.ejs', {
            playlist: allPlaylist,
            currentUser: req.session.currentUser
        });
    });
});

// //show

router.get('/:id', isAuthenticated,(req, res)=>{
    Playlist.findById(req.params.id, (err, foundPlaylist)=>{
        res.render('playlist/show.ejs', {
            playlist:foundPlaylist,
            currentUser: req.session.currentUser
        });
    });
});

// // delete
router.delete('/:id', isAuthenticated, (req,res) => {
  Playlist.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/playlist');
    console.log('deleted Playlist')
  })
})

// edit

router.get('/:id/edit', isAuthenticated, (req, res) => {
Playlist.findById(req.params.id, (err, data) => {
  res.render('playlist/edit.ejs', {
    idOfPlaylistToEdit:data,
    idForPlaylist: req.params.id,
    currentUser: req.session.currentUser
    })
  })
})

// Put

router.put('/:id', isAuthenticated, (req, res, next) => {
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



// videoImgPage
router.get('/:id/video', isAuthenticated, (req, res, next) => {
  Playlist.findById(req.params.id, (err, foundVideo)=>{
      res.render('playlist/video.ejs', {
          playlist:foundVideo,
          currentUser: req.session.currentUser,
      });
  });
});

// add page
router.get('/:id/video/add', isAuthenticated, (req, res) => {
Playlist.findById(req.params.id, (err, data) => {
  res.render('playlist/add.ejs', {
    idOfPlaylistToEdit:data,
    idForPlaylist: req.params.id,
    currentUser: req.session.currentUser,
    })
  })
})


// add video
router.put('/:id/video', isAuthenticated, (req, res, next) => {
	let videoData = {
		video: {
			playlistId: req.params.id,
		}
	}
  Playlist.findById(req.params.id, (err, data) => {
      let vidLink = req.body.videoLink
      let useLink = vidLink.split('=')
      let link = useLink[1];
    data.videoTitle.push(req.body.videoTitle)
    data.videoDescription.push(req.body.videoDescription)
		data.videoImg.push(req.body.videoImg)
    data.videoLink.push(link)
    data.save(function(err, updatedData) {
        console.log(updatedData)
    })
  })
  res.redirect(`/playlist/${videoData.video.playlistId}/video`)
})

// Video Show Page
// https://stackoverflow.com/questions/15128849/using-multiple-parameters-in-url-in-express
router.get('/:id/:indexOfVideo/video', isAuthenticated,(req, res)=>{
	let data = {
		video: {
			playlistId: req.params.id,
			videoId: req.params.indexOfVideo
		}
	}
    Playlist.findById(req.params.id, (err, foundPlaylist)=>{
        res.render('playlist/videoPlay.ejs', {
            playlist:foundPlaylist,
						videoId:data.video.videoId,
            currentUser: req.session.currentUser
        });
    });
});

// edit

router.get('/:id/:indexOfVideo/edit', isAuthenticated, (req, res) => {
	let videoData = {
		video: {
			playlistId: req.params.id,
			videoId: req.params.indexOfVideo
		}
	}
Playlist.findById(req.params.id, (err, data) => {
  res.render('playlist/editVideo.ejs', {
    idOfPlaylistToEdit:data,
    idForPlaylist: req.params.id,
		videoId:videoData.video.videoId,
    currentUser: req.session.currentUser,

    })
  })
})

// put edit
router.put('/:id/:indexOfVideo/video', isAuthenticated, (req, res, next) => {
	let videoData = {
		video: {
			playlistId: req.params.id,
			videoId: req.params.indexOfVideo
		}
	}
	Playlist.findById(req.params.id, (err, data) => {
      let vidLink = req.body.videoLink
      let useLink = vidLink.split('=')
      let link = useLink[1];
    data.videoTitle.splice(videoData.video.videoId, 1, req.body.videoTitle)
    data.videoDescription.splice(videoData.video.videoId, 1, req.body.videoDescription)
		data.videoImg.splice(videoData.video.videoId, 1, req.body.videoImg)
    data.videoLink.splice(videoData.video.videoId, 1, link)
    data.save(function(err, updatedData) {
        console.log(updatedData)
    })
  })
  res.redirect(`/playlist/${videoData.video.playlistId}/video`)
})

// delete Video

router.get('/:id/:indexOfVideo/delete', isAuthenticated, (req, res) => {
	let videoData = {
		video: {
			playlistId: req.params.id,
			videoId: req.params.indexOfVideo
		}
	}
Playlist.findById(req.params.id, (err, data) => {
  res.render('playlist/deleteVid.ejs', {
    idOfPlaylistToEdit:data,
    idForPlaylist: req.params.id,
		videoId:videoData.video.videoId,
    currentUser: req.session.currentUser,

    })
  })
})

// put edit
router.put('/:id/:indexOfVideo', isAuthenticated, (req, res, next) => {
	let videoData = {
		video: {
			playlistId: req.params.id,
			videoId: req.params.indexOfVideo
		}
	}
	Playlist.findById(req.params.id, (err, data) => {
    data.videoTitle.splice(videoData.video.videoId, 1)
    data.videoDescription.splice(videoData.video.videoId)
		data.videoImg.splice(videoData.video.videoId, 1)
    data.videoLink.splice(videoData.video.videoId, 1)
    data.save(function(err, updatedData) {
        console.log(updatedData)
    })
  })
  res.redirect(`/playlist/${videoData.video.playlistId}/video`)
})



module.exports = router
