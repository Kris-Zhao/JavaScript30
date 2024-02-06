// Feature1: Toggle to play/pause the video by clicking the video
const video = document.querySelector('video.viewer')
let isPlaying = false
function toggleVideo(e) {
  if (!isPlaying) {
    playBtn.innerText = '| |'
    video.play()
  } else {
    playBtn.innerText = '►'
    video.pause()
  }
  isPlaying = !isPlaying
}
video.addEventListener('click', toggleVideo)

// Feature2: Toggle to play/pause the video by clicking the button
const playBtn = document.querySelector('button.toggle')
playBtn.addEventListener('click', toggleVideo)

// Feature3: progress bar moving with video the play time
const progressBar = document.querySelector('.progress__filled')
progressBar.style.flexBasis = 0
video.addEventListener('timeupdate', e => {
  progressBar.style.flexBasis = `${(video.currentTime / video.duration).toFixed(4) * 100}` + '%'
})

// Feature4: can click and drag the progress bar
const progress = document.querySelector('.progress')
// progressWidth is 300 here, not 640 as expected
const progressWidth = progress.offsetWidth
progress.addEventListener('click', (e) => {
  video.currentTime = e.offsetX / 640 * video.duration
})

// Feature5: adjust the volume
const volume = document.querySelector('[name="volume"]')
volume.addEventListener('change', e => {
  video.volume = e.target.value
})

// Feature6: adjust the playbackRate
const playbackRate = document.querySelector('[name="playbackRate"]')
playbackRate.addEventListener('change', e => {
  video.playbackRate = e.target.value
})

// Feature7: skip back 10 seconds
// Feature8: skip forward 25 seconds
const skipBtns = document.querySelectorAll('[data-skip]')
skipBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    const skipSecs = btn.dataset.skip
    video.currentTime += Number(skipSecs)
  })
})

// issues:
// 1.no poster when video is not played
// 2.can't drag the progress bar
// 3.640 is hard-coded on line 32 to calculate the ratio