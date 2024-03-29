let checkedEvidences = []
let unwantedEvidences = []
let filteredArr = []
let language = ''

const $list = document.querySelector('.evidence__list')
const colors = ['', '#70bb1f', '#968E6B']
const headerMenuArr = {
    'en': ['CARDS', 'PHRASES'],
    'ru': ['КАРТЫ', 'ФРАЗЫ'],
}

const ghosts = [
    {
        'name': ghostType[0],
        'evidences': [evidenceType[0], evidenceType[5], evidenceType[6]],
    },
    {
        'name': ghostType[1],
        'evidences': [evidenceType[0], evidenceType[3], evidenceType[6]],
    },
    {
        'name': ghostType[2],
        'evidences': [evidenceType[0], evidenceType[2], evidenceType[5]],
    },
    {
        'name': ghostType[3],
        'evidences': [evidenceType[1], evidenceType[3], evidenceType[5]],
    },
    {
        'name': ghostType[4],
        'evidences': [evidenceType[1], evidenceType[4], evidenceType[6]],
    },
    {
        'name': ghostType[5],
        'evidences': [evidenceType[0], evidenceType[3], evidenceType[4]],
    },
    {
        'name': ghostType[6],
        'evidences': [ evidenceType[0], evidenceType[2], evidenceType[4]],
    },
    {
        'name': ghostType[7],
        'evidences': [evidenceType[1], evidenceType[3], evidenceType[4]],
    },
    {
        'name': ghostType[8],
        'evidences': [evidenceType[1], evidenceType[2], evidenceType[5]],
    },
    {
        'name': ghostType[9],
        'evidences': [evidenceType[1], evidenceType[2], evidenceType[4]],
    },
    {
        'name': ghostType[10],
        'evidences': [evidenceType[1], evidenceType[5], evidenceType[6]],
    },
    {
        'name': ghostType[11],
        'evidences': [evidenceType[2], evidenceType[4], evidenceType[6]],
    },
    {
        'name': ghostType[12],
        'evidences': [evidenceType[0], evidenceType[3], evidenceType[5]],
    },
    {
        'name': ghostType[13],
        'evidences': [evidenceType[3], evidenceType[4], evidenceType[6]],
    },
    {
        'name': ghostType[14],
        'evidences': [evidenceType[0], evidenceType[2], evidenceType[6]],
    },
    {
        'name': ghostType[15],
        'evidences': [evidenceType[1], evidenceType[2], evidenceType[6]],
    },
    {
        'name': ghostType[16],
        'evidences': [evidenceType[2], evidenceType[3], evidenceType[6]],
    },
    {
        'name': ghostType[17],
        'evidences': [evidenceType[3], evidenceType[4], evidenceType[5]],
    },
    {
        'name': ghostType[18],
        'evidences': [evidenceType[0], evidenceType[2], evidenceType[3]],
    },
    {
        'name': ghostType[19],
        'evidences': [evidenceType[3], evidenceType[4], evidenceType[5], evidenceType[6]],
    },
    {
        'name': ghostType[20],
        'evidences': [evidenceType[2], evidenceType[4], evidenceType[5]],
    },
    {
        'name': ghostType[21],
        'evidences': [evidenceType[1], evidenceType[4], evidenceType[5]],
    },
    {
        'name': ghostType[22],
        'evidences': [evidenceType[0], evidenceType[1], evidenceType[5]],
    },
    {
        'name': ghostType[23],
        'evidences': [evidenceType[0], evidenceType[1], evidenceType[3]],
    },
]

document.getElementById('header__back').addEventListener('click', headerBack)
document.getElementById('header__menu').addEventListener('click', headerMenu)
document.getElementById('phrases__label').addEventListener('click', phrasesLabel)
document.getElementById('header__theme').addEventListener('click', changeTheme)
document.getElementById('evidence__reset').addEventListener('click', resetBtn)
document.getElementById('evidence__table').addEventListener('click', updateEvidenceTable)

language = document.body.classList.contains('en') ? 'en' : 'ru'

function headerBack () {
    if (document.body.classList.contains('cards-show')) {
        document.body.classList.toggle('cards-show')
    } else if (document.body.classList.contains('phrases-show')) {
        document.body.classList.toggle('phrases-show')
    }

    document.querySelector('.cards').style.display = 'none'
    document.querySelector('.phrases').style.display = 'none'
    document.querySelector('.evidence').style.display = 'block'
    document.getElementById('header__back').style.opacity = '0'
}

function headerMenu(event) {
    let btn = event.target.closest('span')

    headerBack()

    if (btn.classList.contains('header__cards')) {
        document.body.classList.toggle('cards-show')
        document.getElementById('header__back').style.opacity = '1'
        document.querySelector('.cards').style.display = 'block'
        document.querySelector('.evidence').style.display = 'none'
    } else if (btn.classList.contains('header__phrases')) {
        document.body.classList.toggle('phrases-show')
        document.getElementById('header__back').style.opacity = '1'
        document.querySelector('.phrases').style.display = 'block'
        document.querySelector('.evidence').style.display = 'none'
    }
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
    } else if ((checkedEvidences.length > 2) && (!checkedEvidences.includes(evidenceType[3])) ||
        (checkedEvidences.length > 3)) {
        maxEvidence()

    // add the evidence
    } else {
        addEvidence(newEvidence, $addItem)
    }

    updateEvidence()
}

function maxEvidence() {
    if (language === 'en') document.querySelector('.evidence__warning').textContent = 'Can not be more evidences!'
    if (language === 'ru') document.querySelector('.evidence__warning').textContent = 'Не может быть больше улик!'
    setTimeout(() => document.querySelector('.evidence__warning').textContent = '', 3000)
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

function addEvidence(newEvidence, $addItem) {
    checkedEvidences.push(newEvidence)
    $addItem.style.backgroundColor = colors[1]
}

function updateEvidence() {
    filterEvidence(ghosts, checkedEvidences)
    dispayList(filteredArr)
}

function filterEvidence(arr, checkedEvidences) {
    filteredArr = []

    arr.forEach(ghost => {
        let containsAllEvidences = true

        unwantedEvidences.forEach(evidence => {
            if (ghost.evidences.includes(evidence)) containsAllEvidences = false
        })

        checkedEvidences.forEach(evidence => {
            if (!ghost.evidences.includes(evidence)) containsAllEvidences = false
        })

        if (containsAllEvidences) filteredArr.push(ghost)
    })
}

function dispayList(arr) {
    $list.textContent = ''

    if (checkedEvidences.length > 0 || unwantedEvidences.length > 0) {
        arr.forEach(el => {
            let li = document.createElement('li')

            li.textContent = el.name + ' - '

            el.evidences.forEach(evidence => {
                if (!checkedEvidences.includes(evidence)) li.textContent += evidence + ', '
            })

            li.textContent = li.textContent.slice(0, -2)
            $list.appendChild(li)
        })
    }
}