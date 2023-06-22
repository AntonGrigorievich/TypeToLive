const words = 'software behead shake bird feed quality coverage flight battlefield grace find result licence few matter punish snub onion injury sweet village contradiction guitar player toll polish slot coerce sound solve scene rider material have aid common symptom mayor warn retain'
let wasTyped = ''

let typedWords = document.querySelector('.typed')
let wordsToType = document.querySelector('.not-typed')

const startButton = document.querySelector('.button')

const errors = document.querySelector('.type-errors')
const timer = document.querySelector('.type-timer')
let time = 0
let errorCount = 0
let typed = 0

const startTyping = function() {
    const timerInterval = setInterval(() => {
        updateTimer(time, timer)
        time += 1
    }, 1000)
    errors.textContent = errorCount
    startButton.textContent = 'pause'
    typedWords.textContent = wasTyped
    wordsToType.textContent = words.slice(0, 20)
    readInput()
}

const pauseTyping = function() {
    clearInterval(timerInterval)
}

const readInput = function() {
    document.addEventListener('keypress', (event) => {
        key = event.key
        if (key === wordsToType.textContent[0]) {
            typed += 1
            wasTyped += key
            typedWords.textContent = wasTyped.slice(-20, typed)
            wordsToType.textContent = words.slice(typed, 20 + typed)
        } else {
            errorCount += 1
            errors.textContent = errorCount
        }
    })
}

const updateTimer = function(time, timer) {
    seconds = time%60 < 10? `0${time%60}` : `${time%60}`
    minutes = Math.floor(time/60) < 10? `0${Math.floor(time/60)}` : `${Math.floor(time/60)}`
    timer.textContent = `${minutes}:${seconds}`
}


startButton.addEventListener('click', startTyping)
