import { httpService } from './httpService'

export const expService = {
    getExps,
    getExpById,
    remove,
    // update,
    // add,
    getEmptyExp,
    save,
}

async function getExps(filterBy = {}) {
    var queryParams = new URLSearchParams()
    for (const filterType in filterBy) {
        queryParams.set(filterType, filterBy[filterType])
    }
    const exps = await httpService.get(`exp/?${queryParams}`)
    return await httpService.get(`exp/?${queryParams}`)
    //  exps;
}

async function getExpById(expId) {
    const exp = await httpService.get(`exp/${expId}`)
    return Promise.resolve(exp)
}
function remove(expId) {
    return httpService.delete(`exp/${expId}`)
}

async function save(exp) {
    if (exp._id) {
        exp.updatedAt = Date.now();
        // return httpService.put(`exp/${exp._id}`, exp)
        const updateExp = await httpService.put(`exp/${exp._id}`, exp)
        return { exp: updateExp, isNew: false }
    } else {
        // exp.createdAt = Date.now();
        // return httpService.post('exp', exp)
        const updateExp = await httpService.post('exp', exp)
        return { exp: updateExp, isNew: true }
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