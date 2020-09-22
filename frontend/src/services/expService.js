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
    
    const exps = await httpService.get('exp')
    let expToReturn = exps;

    if (Object.keys(filterBy).length) expToReturn = _getExps(exps, filterBy)
    return expToReturn;
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

function _getExps(exps, filterBy) {

    let expsToReturn;
    const keys = Object.keys(filterBy)
    const values = Object.values(filterBy)
    const valueRegex = new RegExp(`${values[0]}`, 'i')

    switch (keys[0]) {
        case 'tag':
            expsToReturn = exps.filter(exp => {
                return exp.tags.some(tag => {
                    return valueRegex.test(tag)
                })
            })
            break;
        case 'address':
            expsToReturn = exps.filter(exp => {
                return valueRegex.test(exp.location.address)
            })
            break;
        case 'owner':
            expsToReturn = exps.filter(exp => {
                return (exp.owner._id === values[0])
            })
            break;
        case 'participants':
            expsToReturn = exps.filter(exp => {
                return exp.participants.some(participant => participant._id === values[0])
            })
            break;
        case 'capacity':
            if (values[0] === 'multi') {
                expsToReturn = exps.filter(exp => {
                    return exp.capacity.min >= 20
                })
            } else {
                expsToReturn = exps.filter(exp => {
                    return exp.capacity.max <= 20
                })
            }
            break;
        default:
            break;
    }
    return expsToReturn;

    // if (filterBy.userId) {
    //     if (filterBy.field === 'owner') {
    //         expToReturn = exps.filter(exp => {
    //             return (exp.owner._id === filterBy.userId)
    //         })
    //     } else if (filterBy.field === 'participant') {
    //         expToReturn = exps.filter(exp => {
    //             return exp.participants.some(participant => participant._id === filterBy.userId)
    //         })
    //     }
    // }
}