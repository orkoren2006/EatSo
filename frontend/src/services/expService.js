import { httpService } from './httpService'
const ObjectId = require('mongodb').ObjectId

export const expService = {
    query,
    getById,
    remove,
    // update,
    // add,
    getEmptyExp,
    save,
}

async function query(filterBy = {}) {
    let URL = 'exp';
    if (Object.keys(filterBy)[0] == "owner._id" || Object.keys(filterBy)[0] == "participants._id") {
        URL = 'myexp'
    }

    var queryParams = new URLSearchParams()
    for (const filterType in filterBy) {
        queryParams.set(filterType, filterBy[filterType])
    }

    return await httpService.get(`${URL}/?${queryParams}`)
    // const exps = await httpService.get(`exp/?${queryParams}`)
    // return await httpService.get(`exp/?${queryParams}`)
}

function getById(expId) {
    return httpService.get(`exp/${expId}`)
 
}
function remove(expId) {
    return httpService.delete(`exp/${expId}`)
}

async function save(exp) {
    
    if (exp._id) {
        exp.updatedAt = Date.now();
        const updateExp = await httpService.put(`exp/${exp._id}`, exp)
        return { exp: updateExp}
    } else {
        // exp.createdAt = Date.now();
        // return httpService.post('exp', exp)
        const updateExp = await httpService.post('exp', exp)
        return { exp: updateExp}
    }
}

// function update(exp) {
//     return httpService.put(`exp/${exp._id}`, exp)
// }
// function add(exp) {
//     return httpService.post(`exp/${exp._id}`, exp)
// }

function getEmptyExp() {
    return {
        'name': '',
        'title': '',
        'desc': '',
        'price': '',
        'capacity': {
            'min': '',
            'max': ''
        },
        'schedule': {
            'at': '',
            'duration': '120'
        },
        'tags': [],
        'imgUrls': [],
        'location': {
            'address': '',
            'city': '',
            'lat': 0.2,
            'lng': 0.2,
        },
        'menu': {
            'appetizers': [

            ],
            'main': [

            ],
            'desserts': [

            ],
            'drinks': [
            ]
        },
        'participants': [
        ],
        'reviews': [
        ],
        'msgs': [
        ]

    }
}