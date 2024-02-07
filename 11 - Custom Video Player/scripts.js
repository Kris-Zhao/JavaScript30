// Feature1: Toggle to play/pause the video by clicking the video
//           Toggle to play/pause the video by clicking the button
const video = document.querySelector('video.viewer')
const playBtn = document.querySelector('button.toggle')
function togglePlay() {
  const method = video.paused ? 'play' : 'pause'
  video[method]()
}
video.addEventListener('click', togglePlay)
playBtn.addEventListener('click', togglePlay)


// Feature2: Update the toggle button 
function updateToggleBtn() {
  const icon = video.paused ? '►' : '❚ ❚'
  playBtn.innerText = icon
}
video.addEventListener('play', updateToggleBtn)
video.addEventListener('pause', updateToggleBtn)


// Feature3: progress bar moving with video the play time
const progressBar = document.querySelector('.progress__filled')
progressBar.style.flexBasis = 0
function handleProgress() {
  const percent = (video.currentTime / video.duration).toFixed(4) * 100
  progressBar.style.flexBasis = `${percent}%`
}
video.addEventListener('timeupdate', handleProgress)


// Feature4: can click and drag the progress bar
const progress = document.querySelector('.progress')
function scrub(e) {
  video.currentTime = e.offsetX / progress.offsetWidth * video.duration
}
progress.addEventListener('click', scrub)

let isMouseDown = false
progress.addEventListener('mousedown', () => isMouseDown = true)
progress.addEventListener('mouseup', () => isMouseDown = false)
progress.addEventListener('mousemove', (e) => isMouseDown && scrub(e))


// Feature5: adjust the volume and playbackRate
const ranges = document.querySelectorAll('.player__slider')
function handleRangeUpdate() {
  video[this.name] = this.value
}
ranges.forEach(range => {
  range.addEventListener('change', handleRangeUpdate)
  range.addEventListener('mousemove', handleRangeUpdate)
});


// Feature6: skip button functionality
const skipBtns = document.querySelectorAll('[data-skip]')
skipBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    const skipSecs = btn.dataset.skip
    video.currentTime += Number(skipSecs)
  })
})


// Feature7: add a new button to full screen the video
const fullScreenBtn = document.querySelector('#fullScreen')
function fullScreen() {
  video.requestFullscreen()
}
fullScreenBtn.addEventListener('click', fullScreen)


// issues:
// 1.no poster when video is not played
// 2.Fixed - can't drag the progress bar
//   Having a isMouseDown variable and the coordination of mousedown, mouseup and mousemove events
//   can achieve the effect of dragging the video progress element.
// 3.Fixed - 640 is hard-coded on line 32 to calculate the ratio
//   progress.offsetWidth is correct as 640 when it is inside the event listener. Previously, when
//   I console log progress.offsetWidth outside, it will return 300 because at that moment, the html
//   page is not full rendered and the video source is not actually injected/applied yet, so the width
//   is not 640 as expected.