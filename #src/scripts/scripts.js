let checkedEvidences = []
let unwantedEvidences = []
let filteredArr = []
let language = ''

const $list = document.querySelector('.evidence__list')
const colors = ['', '#70bb1f', '#968E6B']
const headerPhrasesArr = {
    'en': ['PHRASES', 'CALC'],
    'ru': ['ФРАЗЫ', 'КАЛЬКУЛЯТОР'],
}

document.getElementById('header__phrases').addEventListener('click', phrasesBtn)
document.getElementById('phrases__label').addEventListener('click', phrasesLabel)
document.getElementById('header__theme').addEventListener('click', changeTheme)
document.getElementById('evidence__reset').addEventListener('click', resetBtn)
document.getElementById('evidence__table').addEventListener('click', updateEvidenceTable)

language = document.body.classList.contains('en') ? 'en' : 'ru'

function phrasesBtn(event) {
    if (document.body.classList.contains('phrases-show')) {
        document.querySelector('.phrases').style.display = 'none'
        document.querySelector('.evidence').style.display = 'block'
        event.target.textContent = headerPhrasesArr[language][0]
    } else {
        document.querySelector('.evidence').style.display = 'none'
        document.querySelector('.phrases').style.display = 'block'
        event.target.textContent = headerPhrasesArr[language][1]
    }

    document.body.classList.toggle('phrases-show')
}

function phrasesLabel(event) {
    let label = event.target.closest('li')
    let labelItems = document.getElementById('phrases__label').querySelectorAll('li')
    let textItems = document.getElementById('phrases__text').querySelectorAll('div')
    
    labelItems.forEach(el => el.classList.remove('label-active'))
    event.target.closest('li').classList.add('label-active')

    if (label.classList.contains('phrases__all-label')) {
        textItems.forEach(el => el.style.display = 'block')

    } else {
        textItems.forEach(el => el.style.display = 'none')

        if (label.classList.contains('phrases__general-label')) {
            document.querySelector('.phrases__general').style.display = 'block'

        } else if (label.classList.contains('phrases__box-label')) {
            console.log('wqee213')
            document.querySelector('.phrases__box').style.display = 'block'

        } else if (label.classList.contains('phrases__board-label')) {
            document.querySelector('.phrases__board').style.display = 'block'

        } else if (label.classList.contains('phrases__trigger-label')) {
            document.querySelector('.phrases__trigger').style.display = 'block'
        }
    }
}

function changeTheme() {
    if (!localStorage.getItem('theme-switched')) {
        document.body.classList.toggle('theme')
        localStorage.setItem('theme-switched', JSON.stringify(true))
    } else {
        document.body.classList.toggle('theme')
        localStorage.removeItem('theme-switched')
    }
}

function resetBtn() {
    checkedEvidences = []
    unwantedEvidences = []
    filteredArr = []
    document.querySelectorAll('.evidence__body').forEach (el => el.style.backgroundColor = colors[0])
    $list.textContent = ''
}

function updateEvidenceTable(event) {
    let $addItem = event.target.closest('.evidence__item').querySelector('.evidence__body')
    let newEvidence = event.target.closest('.evidence__item').querySelector('span').dataset.type

    // if clicked remove button or in unwanted
    if ((event.target.closest('.evidence__not-icon') || unwantedEvidences.includes(newEvidence))) {
        unwantedEvidence(newEvidence, $addItem)

    // if already checked
    } else if (checkedEvidences.includes(newEvidence)) {
        removeEvidence(newEvidence, $addItem)
        
    // if more than 3 evidences
    } else if (checkedEvidences.length > 2) {
        maxEvidence()

    // add the evidence
    } else {
        addEvidence(newEvidence, $addItem)
    }

    updateEvidence()
}

function unwantedEvidence(newEvidence, $addItem) {
    if (checkedEvidences.includes(newEvidence)) {
        removeEvidence(newEvidence, $addItem)
        unwantedEvidences.push(newEvidence)
        $addItem.style.backgroundColor = colors[2]

    } else if (unwantedEvidences.includes(newEvidence)) {
        unwantedEvidences.splice(unwantedEvidences.indexOf(newEvidence), 1)
        $addItem.style.backgroundColor = colors[0]

    } else if (!unwantedEvidences.includes(newEvidence) || checkedEvidences === []) {
        unwantedEvidences.push(newEvidence)
        $addItem.style.backgroundColor = colors[2]
    }
}

function removeEvidence(newEvidence, $addItem) {
    checkedEvidences.splice(checkedEvidences.indexOf(newEvidence), 1)
    $addItem.style.backgroundColor = colors[0]
}

function maxEvidence() {
    document.querySelector('.evidence__warning').textContent = 'Can not be more than 3 evidences!'
    setTimeout(() => document.querySelector('.evidence__warning').textContent = '', 3000)
}

function addEvidence(newEvidence, $addItem) {
    checkedEvidences.push(newEvidence)
    $addItem.style.backgroundColor = colors[1]
}

function updateEvidence() {
    filterEvidence(Object.entries(ghosts), checkedEvidences)
    dispayList(filteredArr)
}

function filterEvidence(arr, checkedEvidences) {
    filteredArr = []

    arr.forEach(ghost => {
        let containsAllEvidences = true

        unwantedEvidences.forEach(evidence => {
            if (ghost[1].evidences.includes(evidence)) containsAllEvidences = false
        })

        checkedEvidences.forEach(evidence => {
            if (!ghost[1].evidences.includes(evidence)) containsAllEvidences = false
        })

        if (containsAllEvidences) filteredArr.push(ghost)
    })
}

function dispayList(arr) {
    $list.textContent = ''

    if (checkedEvidences.length > 0 || unwantedEvidences.length > 0) {
        arr.forEach(el => {
            let li = document.createElement('li')

            if (checkedEvidences.length === 3) {
                li.textContent = el[0]
            } else {
                li.textContent = el[0] + ' - '
                el[1].evidences.forEach(evidences => {
                    if (!checkedEvidences.includes(evidences)) li.textContent += evidences + ', '
                })
                li.textContent = li.textContent.slice(0, -2)
            }
            $list.appendChild(li)
        })
    }
}