import { httpService } from './httpService'

export const expService = {
    getExps,
    getById,
    remove,
    // update,
    // add,
    getEmptyExp,
    save,
}

async function getExps(filterBy = {}) {
    const exps = await httpService.get('exp')
    let expToReturn = exps;
    if (filterBy.userId) {
        if (filterBy.field === 'owner') {
            expToReturn = exps.filter(exp => {
                return (exp.owner._id === filterBy.userId)
            })
        } else if (filterBy.field === 'participant') {
            expToReturn = exps.filter(exp => {
                return exp.participants.some(participant => participant._id === filterBy.userId)
            })
        }
    }
    return expToReturn;
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
            "at": '',
            "duration": ''
        },
        'tags': [],
        'imgUrls': [],
        'location': {
            'address': '',
            'city': '',
        }
    }
}