const words = 'software behead shake bird feed quality coverage flight battlefield grace find result licence few matter punish snub onion injury sweet village contradiction guitar player toll polish slot coerce sound solve scene rider material have aid common symptom mayor warn retain'
// const words = 'aaaaa'
let wasTyped = ''

let typedWords = document.querySelector('.typed')
let wordsToType = document.querySelector('.not-typed')
const infoDialog = document.querySelector('dialog')

const startButton = document.querySelector('.button')

const errors = document.querySelector('.type-errors')
const timer = document.querySelector('.type-timer')
let timerInterval
let time = 0
let errorCount = 0
let typed = 0

const startTyping = function() {
    timerInterval = setInterval(() => {
        updateTimer(time, timer)
        time += 1
    }, 1000)

    errors.textContent = errorCount
    startButton.textContent = 'pause'
    startButton.onclick = pauseTyping
    infoDialog.close()

    typedWords.textContent = wasTyped.slice(-20, typed)
    wordsToType.textContent = words.slice(typed, 20 + typed)

    readInput()
}

const pauseTyping = function() {
    clearInterval(timerInterval)
    document.onkeydown = {}
    startButton.textContent = 'resume'
    startButton.onclick = startTyping
    updateInfoDialog(infoDialog)
    infoDialog.show()
}

const finishTyping = function() {
    updateInfoDialog(infoDialog)
    infoDialog.show()
}

const readInput = function() {
    document.onkeydown = (event) => {
        checkKey(event)
    }
}

const checkKey = function(event) {
    key = event.key
        if (key === wordsToType.textContent[0]) {
            typed += 1
            wasTyped += key
            typedWords.textContent = wasTyped.slice(-20, typed)
            wordsToType.textContent = words.slice(typed, 20 + typed)
            res = true
        } else {
            errorCount += 1
            errors.textContent = errorCount
            res = false
        }
    if (typed >= words.length){
        console.log('stop');
        pauseTyping()
        clearInterval(timerInterval)
        startButton.textContent = 'restart'
        errorCount = 0
        typed = 0
        time = 0
        return
    }
    return res
}

const updateTimer = function(time, timer) {
    seconds = time%60 < 10? `0${time%60}` : `${time%60}`
    minutes = Math.floor(time/60) < 10? `0${Math.floor(time/60)}` : `${Math.floor(time/60)}`
    timer.textContent = `${minutes}:${seconds}`
}

const updateInfoDialog = function(dialog) {
    rows = dialog.children
    updateTimer(time, rows[0])
    rows[1].textContent = typed + ' знаков'
    rows[2].textContent = '~' + String(typed / time * 60).slice(0, 3) + ' знаков в минуту'
    rows[3].textContent = String((typed / (typed + errorCount) * 100).toFixed(2)) + ' % точность'
}

startButton.onclick = startTyping
