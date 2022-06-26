const source = "/assets/music/themeMusic.mp3";
const audio = new Audio(); // use the constructor in JavaScript, just easier that way
const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe-obstacle')
const musicTheme = document.querySelector('.musicTheme')
const musicGameOver = document.querySelector('.music-game-over')

audio.src = source;
function jumpMario() {
    mario.classList.add('jump-mario')
    setTimeout(() => {
        mario.classList.remove('jump-mario')
    }, 500)
}
const onLoopCheck = setInterval(() => {
    audio.play();
    const pipeObstaclePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')
    console.log(marioPosition);
    console.log(pipeObstaclePosition);
    if (pipeObstaclePosition <= 120 && marioPosition < 80 && pipeObstaclePosition > 0) {

        audio.pause()
        musicGameOver.play()

        pipe.style.animation = "none"
        pipe.style.left = `${pipeObstaclePosition}px`

        mario.style.animation = "none"
        mario.style.bottom = `${marioPosition}px`

        mario.src = "/assets/game-over.png"
        mario.style.width = "75px"
        mario.style.left = "50px"

        clearInterval(onLoopCheck)
    }
}, 10)

document.addEventListener('keydown', jumpMario)