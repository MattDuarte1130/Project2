# Playlist App
by Matt Duarte

## Wireframe
![alt text](https://i.imgur.com/wvpcauh.png "Wireframe")

## User Story
1. The user Logs in or signs up on home page.
2. The user can then click the play button to go to the playlist index page.
3. The Playlist index page allows you to view your playlists or create a new playlist.
4. After clicking a playlist it goes to the playlist show page, that has the description and allows you to edit or delete the playlist.
5. On the playlist show page clicking the playlist picture will take you to the video index page.
6. The video index page allows you to view all the videos in the playlist.
7. Clicking the video's image will take you to the video show page.
8. The video show page displays the youtube video, and allows you to edit or delete that video.
9. All the data created is unique and can only be visable to the user currently logged in.

## How the app works
1. The user can create as many playlists as they want.
2. The user can then add as many videos to whichever playlists they want.
3. The user can view youtube videos in the app in the video show page.
4. The user can edit and delete playlists and videos.
5. The user only has access to the playlists and videos they create themselves, when logged in.

## Struggles 
1. Making the data only unique to the user took me quite a while.
2. It took me a while to figure out how to add new data to an array in the playlist schema.
3. I wanted to put multer into my app, but I was running out of time.
4. In the beginning I had videos in a seperate schema until I made them arrays in the playlist schema.

## Wins
1. I really like how my app looks all together.
2. I was able to get the youtube links to split and insert the <iframe>
3. I was able to get the users to have their own unique data.

## Some Functionality
1. To get the videos in the web page I used <iframe> HTML tage with youtube/embeded.
2. I used .splice() and .push() to manipulate the arrays then using .save() for the video arrays in the playlist schema.
3. I use user.id tand attach it to when the playlist is created to make it only visible to the current user.


## What I want to add
1. I really want add multer to my app.
2. Make a share code so you can share the code and allow other users to see your playlists.
3. I also want to amke it so users can comment on each others playlists.
