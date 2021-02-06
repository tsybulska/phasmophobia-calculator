const ghosts = {
    'Phantom': {
        'evidences': [
            'Freezing Temperature', 'EMF Level 5', 'Ghost Orbs'
        ],
    },
    'Banshee': {
        'evidences': [
            'Freezing Temperature', 'EMF Level 5', 'Fingerprints'
        ],
    },
    'Wraith': {
        'evidences': [
            'Freezing Temperature', 'Spirit Box', 'Fingerprints'
        ],
    },
    'Mare': {
        'evidences': [
            'Freezing Temperature', 'Spirit Box', 'Ghost Orbs'
        ],
    },
    'Demon': {
        'evidences': [
            'Freezing Temperature', 'Spirit Box', 'Ghost Writing'
        ],
    },
    'Yurei': {
        'evidences': [
            'Freezing Temperature', 'Ghost Writing', 'Ghost Orbs'
        ],
    },
    'Oni': {
        'evidences': [
            'Ghost Writing', 'Spirit Box', 'EMF Level 5'
        ],
    },
    'Revenant': {
        'evidences': [
            'Ghost Writing', 'Fingerprints', 'EMF Level 5'
        ],
    },
    'Shade': {
        'evidences': [
            'Ghost Writing', 'Ghost Orbs', 'EMF Level 5'
        ],
    },
    'Poltergeist': {
        'evidences': [
            'Spirit Box', 'Fingerprints	', 'Ghost Orbs'
        ],
    },
    'Jinn': {
        'evidences': [
            'Spirit Box', 'EMF Level 5', 'Ghost Orbs'
        ],
    },
}

let checkedEvidences = []
let unwantedEvidences = []
let filteredArr = []

document.getElementById('evidence__table').addEventListener('click', updateEvidenceTable)

function updateEvidenceTable(event) {
    let $addItem = event.target.closest('.evidence__item').querySelector('.evidence__body')
    let newEvidence = event.target.closest('.evidence__item').querySelector('span').textContent
    
    // if clicked remove button
    if ((event.target.getAttribute('class') === 'evidence__icon--undone')) {
        unwantedEvidenceButton(newEvidence, $addItem)

    // if already checked
    } else if (checkedEvidences.includes(newEvidence)) {
        removeEvidence(newEvidence, $addItem)

    // if more than 3 evidences
    } else if (checkedEvidences.length > 2) {
        document.querySelector('.evidence__warning').textContent = 'Can not be more then 3 evidences!'
        setTimeout(() => document.querySelector('.evidence__warning').textContent = '', 3000)

    // add the evidence
    } else {
        addEvidence(newEvidence, $addItem)
    }
}

function unwantedEvidenceButton(newEvidence, $addItem) {
    if (!unwantedEvidences.includes(newEvidence)) {
        unwantedEvidences.push(newEvidence)
        addEvidenceFilter(Object.entries(ghosts), checkedEvidences)
        dispayList(filteredArr)
        $addItem.style.backgroundColor = 'grey'

    } else if (unwantedEvidences.includes(newEvidence)) {
        unwantedEvidences.splice(unwantedEvidences.indexOf(newEvidence), 1)
        addEvidenceFilter(Object.entries(ghosts), checkedEvidences)
        dispayList(filteredArr)
        $addItem.style.backgroundColor = ''

    } else if (checkedEvidences.includes(newEvidence)) {
        unwantedEvidences.push(newEvidence)
        removeEvidence(newEvidence, $addItem)
        $addItem.style.backgroundColor = 'grey'
    }
}

function removeEvidence(newEvidence, $addItem) {
    $addItem.style.backgroundColor = ''
    checkedEvidences.splice(checkedEvidences.indexOf(newEvidence), 1)
    addEvidenceFilter(Object.entries(ghosts), checkedEvidences)
    dispayList(filteredArr)
}

function addEvidence(newEvidence, $addItem) {
    checkedEvidences.push(newEvidence)
    addEvidenceFilter(Object.entries(ghosts), checkedEvidences)
    dispayList(filteredArr)
    $addItem.style.backgroundColor = 'yellowgreen'
}

function addEvidenceFilter(arr, checkedEvidences) {
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
    let $list = document.querySelector('.evidence__list').querySelector('span')
    $list.textContent = ''

    if (checkedEvidences.length > 0) {
        arr.forEach(el => {
            $list.textContent = $list.textContent + el[0] + ' '
        })
    }
}
