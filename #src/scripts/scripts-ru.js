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
    'Дух': {
        'evidences': [
            'Блокнот', 'Отпечатки', 'Радиоприемник'
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
    'Ёкай': {
        'evidences': [
            'Spirit Box', 'Ghost Writing', 'Ghost Orbs'
        ],
    },
    'Ханту': {
        'evidences': [
            'Fingerprints', 'Ghost Writing', 'Ghost Orbs'
        ],
    },
}

document.getElementById('header__phrases').addEventListener('click', phrasesBtn)

function phrasesBtn() {
    if (document.body.classList.contains('phrases-show')) {
        document.getElementById('header__phrases').textContent = 'ФРАЗЫ'
    } else {
        document.getElementById('header__phrases').textContent = 'КАЛЬКУЛЯТОР'
    }
}