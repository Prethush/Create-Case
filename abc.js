function watchTutorialCallback(callback, errorCallback) {
  let userLeft = false
  let userWatchingCatMeme = false

  if (userLeft) {
    errorCallback({
      name: 'User Left', 
      message: ':('
    })
  } else if (userWatchingCatMeme) {
    errorCallback({
      name: 'User Watching Cat Meme',
      message: 'WebDevSimplified < Cat' 
    })
  } else {
    callback('Thumbs up and Subscribe')
  }
}
