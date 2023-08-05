// let words = 'software behead shake bird feed quality coverage flight battlefield grace find result licence few matter punish snub onion injury sweet village contradiction guitar player toll polish slot coerce sound solve scene rider material have aid common symptom mayor warn retain'
// const words = 'aaaaa'
let words
let wasTyped = ''

let typedWords = document.querySelector('.typed')
let wordsToType = document.querySelector('.not-typed')

const infoDialog = document.querySelector('.stats-dialog')
const settingsDialog = document.querySelector('.settings-dialog')

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

// generated words parameters
let fishWordsUrl = 'https://random-word-api.herokuapp.com/word'
let number = document.querySelector('#words-amount').value
let length = document.querySelector('#words-length').value 
let lang = document.querySelector('#words-language').value


// fishWordsUrl += `?number=${number}`
// if (length) {fishWordsUrl += `$length=${length}`}
// if (lang) {fishWordsUrl += `&lang=${lang}`}
// fetch(fishWordsUrl)
//     .then(response => response.json())
//     .then(data => words = data.join(' '));

const updateSettings = function() {
    number = document.querySelector('#words-amount').value
    length = document.querySelector('#words-length').value
    lang = document.querySelector('#words-language').value 
}

const fetchFishWords = async function(number=10, length=null, lang=null, url = fishWordsUrl) {
    length = length == 0? null: length
    lang = lang == 'en'? null: lang

    console.log(`FETCHING --- ${number} words of length ${length? length: 'any'} and ${lang? lang: 'en'}`)
    url += `?number=${number}`
    if (length) {url += `&length=${length}`}
    if (lang) {url += `&lang=${lang}`}
    await fetch(url)
    .then(response => response.json())
    .then(data => {
        if (!data.length) {throw err}
        console.log('Response:', data)
        words = data.join(' ').toLowerCase()
        return true
})
    .catch(err => {
        console.error(err)
        words = 'Sorry, we failed to generate words'
        return false
    })
}

const startTyping = async function() {
    if (!words) {
        updateSettings()
        await fetchFishWords(number, length, lang)
    }
    timerInterval = setInterval(() => {
        updateTimer(time, timer)
        time += 1
    }, 1000)

    errors.textContent = errorCount
    dialogResumeButton.style.visibility = 'visible'
    settingsButton.style.display = 'none'
    startButton.textContent = 'pause'
    startButton.onclick = pauseTyping
    settingsDialog.close()
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

startButton.onclick = startTyping
settingsButton.onclick = (() => {
    if (settingsDialog.open) {settingsDialog.close()}
    else (settingsDialog.show())
})
dialogResumeButton.onclick = startTyping
dailogRestartButton.onclick = () => {
    finishTyping()
    startTyping()
}

// const typer = new Typewriter()
// typer.startButton.onclick = typer.startTyping()