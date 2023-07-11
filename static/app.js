let words = 'software behead shake bird feed quality coverage flight battlefield grace find result licence few matter punish snub onion injury sweet village contradiction guitar player toll polish slot coerce sound solve scene rider material have aid common symptom mayor warn retain'
// const words = 'aaaaa'
// let words
let wasTyped = ''

let typedWords = document.querySelector('.typed')
let wordsToType = document.querySelector('.not-typed')
const infoDialog = document.querySelector('.stats-dialog')

const startButton = document.querySelector('#start-button')
const settingsButton = document.querySelector('#settings-button')
const dialogResumeButton = document.querySelector('#dialog-resume-button')
const dailogRestartButton = document.querySelector('#dialog-restart-button')

const errors = document.querySelector('.type-errors')
const timer = document.querySelector('.type-timer')
let timerInterval
let time = 0
let errorCount = 0
let typed = 0

// class Typewriter {

//     constructor() {
//         // ticker content
//         this.words = '' 
//         this.wasTyped = ''

//         // statistics
//         this.timerInterval
//         this.time = 0
//         this.errorCount = 0
//         this.typed = 0

//         // typewriter DOM elements
//         this.errors = document.querySelector('.type-errors')
//         this.timer = document.querySelector('.type-timer')
//         this.typedWords = document.querySelector('.typed')
//         this.wordsToType = document.querySelector('.not-typed')
//         this.infoDialog = document.querySelector('dialog')
//         this.startButton = document.querySelector('#start-button')
//         this.dialogResumeButton = document.querySelector('#dialog-resume-button')
//         this.dailogRestartButton = document.querySelector('#dialog-restart-button')

//         // this.startButton.onclick = this.startTyping
//         // this.dialogResumeButton.onclick = this.startTyping
//         // this.dailogRestartButton.onclick = () => {
//         //     this.finishTyping()
//         //     this.startTyping()
//         // }
//     }
    
//     updateTimer(time, timer) {
//         seconds = time%60 < 10? `0${time%60}` : `${time%60}`
//         minutes = Math.floor(time/60) < 10? `0${Math.floor(time/60)}` : `${Math.floor(time/60)}`
//         timer.textContent = `${minutes}:${seconds}`
//     }

//     startTyping() {
//         this.timerInterval = setInterval(() => {
//             this.updateTimer(this.time, this.timer)
//             this.time++
//         }, 1000)

//         console.log('a;sdlkfj', this.errors)
//         this.errors.textContent = this.errorCount
//         this.dialogResumeButton.style.visibility = 'visible'
//         this.startButton.textContent = 'pause'
//         this.startButton.onclick = this.pauseTyping
//         this.infoDialog.close()

//         this.typedWords.textContent = this.wasTyped.slice(-20, typed)
//         this.wordsToType.textContent = this.words.slice(typed, 20 + typed)

//         this.readInput()
//     }

//     pauseTyping() {
//         clearInterval(this.timerInterval)
//         document.onkeydown = {}
//         // TODO: save progress to local storage and resume later?
//         this.startButton.textContent = 'resume'
//         this.startButton.onclick = this.startTyping
//         this.updateInfoDialog(this.infoDialog)
//         this.infoDialog.show()
//     }

//     finishTyping() {
//         this.dialogResumeButton.style.visibility = 'hidden'
//         document.onkeydown = {}
//         clearInterval(this.timerInterval)
//         this.updateInfoDialog(this.infoDialog)
//         this.infoDialog.show()
//         this.time = 0
//         this.errorCount = 0
//         this.typed = 0
//         this.wasTyped = ''
//     }

//     checkKey(event) {
//         key = event.key
//         if (key === this.wordsToType.textContent[0]) {
//             this.typed++
//             this.wasTyped += key
//             this.typedWords.textContent = this.wasTyped.slice(-20, typed)
//             this.wordsToType.textContent = this.words.slice(this.typed, 20 + this.typed)
//             res = true
//         } else {
//             this.errorCount++
//             this.errors.textContent = this.errorCount
//             res = false
//         }
//         if (this.typed >= this.words.length) {
//             this.finishTyping()
//             clearInterval(this.timerInterval)
//             this.startButton.textContent = 'restart'
//             this.errorCount = 0
//             this.typed = 0
//             this.time = 0
//             return
//         }
//         return res
//     }

//     readInput() {
//         document.onkeydown = (event) => {
//             checkKey(event)
//         }
//     }

//     updateInfoDialog(dialog) {
//         rows = dialog.children
//         this.updateTimer(this.time, rows[0])
//         rows[1].textContent = this.typed + ' знаков'
//         rows[2].textContent = '~' + String(this.typed / this.time * 60).slice(0, 3) + ' знаков в минуту'
//         rows[3].textContent = String((this.typed / (this.typed + this.errorCount) * 100).toFixed(2)) + ' % точность'
//     }
// }


const startTyping = function() {
    timerInterval = setInterval(() => {
        updateTimer(time, timer)
        time += 1
    }, 1000)

    errors.textContent = errorCount
    dialogResumeButton.style.visibility = 'visible'
    settingsButton.style.display = 'none'
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
    dialogResumeButton.style.visibility = 'hidden'
    document.onkeydown = {}
    clearInterval(timerInterval)
    updateInfoDialog(infoDialog)
    infoDialog.show()
    time = 0
    updateTimer(time, timer)
    errorCount = 0
    typed = 0
    wasTyped = ''
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
        finishTyping()
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

// console.log('FETCHING ---')
// fetch('https://random-word-api.herokuapp.com/word?number=10')
//     .then(response => response.json())
//     .then(data => words = data.join(' '));


startButton.onclick = startTyping
settingsButton.onclick = (() => console.log('settings'))
dialogResumeButton.onclick = startTyping
dailogRestartButton.onclick = () => {
    finishTyping()
    startTyping()
}

// const typer = new Typewriter()
// typer.startButton.onclick = typer.startTyping()