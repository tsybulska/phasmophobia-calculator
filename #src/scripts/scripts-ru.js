const ghosts = {
    'Фантом': {
        'evidences': [
            'Минусовая Темп', 'ЭМП ур.5', 'Огонек'
        ],
    },
    'Банши': {
        'evidences': [
            'Минусовая Темп', 'ЭМП ур.5', 'Отпечатки'
        ],
    },
    'Мираж': {
        'evidences': [
            'Минусовая Темп', 'Радиоприемник', 'Отпечатки'
        ],
    },
    'Мара': {
        'evidences': [
            'Минусовая Темп', 'Радиоприемник', 'Огонек'
        ],
    },
    'Демон': {
        'evidences': [
            'Минусовая Темп', 'Радиоприемник', 'Блокнот'
        ],
    },
    'Юрэй': {
        'evidences': [
            'Минусовая Темп', 'Блокнот', 'Огонек'
        ],
    },
    'Они': {
        'evidences': [
            'Блокнот', 'Радиоприемник', 'ЭМП ур.5'
        ],
    },
    'Ревенант': {
        'evidences': [
            'Блокнот', 'Отпечатки', 'ЭМП ур.5'
        ],
    },
    'Тень': {
        'evidences': [
            'Блокнот', 'Огонек', 'ЭМП ур.5'
        ],
    },
    'Полтергейст': {
        'evidences': [
            'Радиоприемник', 'Отпечатки', 'Огонек'
        ],
    },
    'Джинн': {
        'evidences': [
            'Радиоприемник', 'ЭМП ур.5', 'Огонек'
        ],
    },
}

let checkedEvidences = []
let unwantedEvidences = []
let filteredArr = []

const $list = document.querySelector('.evidence__list')
const colors = ['', 'yellowgreen', 'grey']

document.getElementById('header__theme').addEventListener('click', changeTheme)
document.getElementById('evidence__reset').addEventListener('click', resetBtn)
let $table = document.getElementById('evidence__table').addEventListener('click', updateEvidenceTable)

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
    if ((event.target.getAttribute('class') === 'evidence__icon--undone') || unwantedEvidences.includes(newEvidence)) {
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

    } else if (!unwantedEvidences.includes(newEvidence)) {
        unwantedEvidences.push(newEvidence)
        $addItem.style.backgroundColor = colors[2]
    }
}

function removeEvidence(newEvidence, $addItem) {
    checkedEvidences.splice(checkedEvidences.indexOf(newEvidence), 1)
    $addItem.style.backgroundColor = colors[0]
}

function maxEvidence() {
    document.querySelector('.evidence__warning').textContent = 'Не может быть больше трех улик!'
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

    if (checkedEvidences.length > 0) {
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
