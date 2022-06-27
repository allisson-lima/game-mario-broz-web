const source = "/assets/music/themeMusic.mp3";
const audio = new Audio();
const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe-obstacle')
const musicTheme = document.querySelector('.musicTheme')
const musicGameOver = document.querySelector('.music-game-over')
const btnStart = document.querySelector('.start')
const container = document.querySelector('.containerGamer')
const floor = document.querySelector('.floor')

let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;

let cron;

btnStart.onclick = () => start();
// document.form_main.pause.onclick = () => pause();
// document.form_main.reset.onclick = () => reset();

function start() {
    pause();
    cron = setInterval(() => { timer(); }, 10);
}

function pause() {
    clearInterval(cron);
}

function reset() {
    hour = 0;
    minute = 0;
    second = 0;
    millisecond = 0;
    document.getElementById('hour').innerText = '00';
    document.getElementById('minute').innerText = '00';
    document.getElementById('second').innerText = '00';
    document.getElementById('millisecond').innerText = '000';
}

function timer() {
    if ((millisecond += 10) == 1000) {
        millisecond = 0;
        second++;
    }
    if (second == 60) {
        second = 0;
        minute++;
    }
    if (minute == 60) {
        minute = 0;
        hour++;
    }
    document.getElementById('hour').innerText = returnData(hour);
    document.getElementById('minute').innerText = returnData(minute);
    document.getElementById('second').innerText = returnData(second);
    document.getElementById('millisecond').innerText = returnData(millisecond / 10);
}

function returnData(input) {
    7
    return input > 10 ? input : `0${input}`
}
audio.src = source;
function jumpMario(e) {
    mario.classList.add('jump-mario')
    setTimeout(() => {
        mario.classList.remove('jump-mario')
    }, 500)
}
let gameOver = false




document.addEventListener('keypress', function (e) {
    const space = 32;
    if (e.which === space) {
        mario.classList.add('jump-mario')
        setTimeout(() => {
            mario.classList.remove('jump-mario')
        }, 500)
    }
})




const onLoopCheck = setInterval(() => {

    setTimeout(() => {
        pipe.src = "/assets/pipe.png"
    }, 8095)

    const pipeObstaclePosition = pipe.offsetLeft;

    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')
    console.log(marioPosition);
    console.log({ pipeObstaclePosition });
    if (pipeObstaclePosition <= 120 && marioPosition < 80 && pipeObstaclePosition > 0) {
        pause()
        audio.pause()
        musicGameOver.play()

        pipe.style.animation = "none"
        pipe.style.left = `${pipeObstaclePosition}px`

        mario.style.animation = "none"
        mario.style.bottom = `${marioPosition}px`

        mario.src = "/assets/game-over.png"
        mario.style.width = "75px"
        mario.style.left = "50px"

        gameOver = true

        clearInterval(onLoopCheck)
        setTimeout(() => {
            document.location.reload(true);
        }, 8000)
    }
}, 10)
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && !gameOver) {
        btnStart.click();
        onLoopCheck

    }
},);
btnStart.addEventListener('click', () => {
    onLoopCheck
    audio.play();
    btnStart.style.display = "none"
    container.style.display = "flex"
    floor.style.display = "flex"
})