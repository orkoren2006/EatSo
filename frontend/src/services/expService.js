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

    if (Object.keys(filterBy).length) expToReturn = _getExps(exps,filterBy)
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

function _getExps(exps,filterBy) {

    let expsToReturn;
    // const [field, keyWord] = attr.split('-')
    const { field, keyWord } = filterBy

    const keyWordRegex = new RegExp(`${keyWord}`, 'i')

    // debugger
    switch (field) {
        case 'tag':
            expsToReturn = exps.filter(exp => {
                return exp.tags.some(tag => {
                    return keyWordRegex.test(tag)
                })
            })
            break;
        case 'address':
            expsToReturn = exps.filter(exp => {
                return keyWordRegex.test(exp.location.address)
            })
            break;
        case 'owner':
            expsToReturn = exps.filter(exp => {
                return (exp.owner._id === keyWord)
            })
            break;
        case 'participant':
            expsToReturn = exps.filter(exp => {
                return exp.participants.some(participant => participant._id === keyWord)
            })
            break;
        case 'capacity':
            if (keyWord === 'multi') {
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